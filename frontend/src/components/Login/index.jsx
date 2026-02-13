import { useState, useContext } from "react";
import Cookies from "js-cookie";
import { Navigate, useNavigate } from "react-router-dom";

import SavedContext from "../../context/SavedContext";

import {
  LoginContainer,
  FormConatiner,
  ImageElement,
  LabelAndInputConatiner,
  InputElement,
  LabelElement,
  LoginButton,
  ErrorMsg,
  AuthRedirectText,
  AuthRedirectLink,
} from "./StyledComponents";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showErrorMsg, setShowErrorMsg] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  const navigate = useNavigate();
  const { isDarkMode } = useContext(SavedContext);

  const changeEmail = (event) => {
    setEmail(event.target.value);
    setShowErrorMsg(false);
    setErrorMsg("");
  };

  const changePassword = (event) => {
    setPassword(event.target.value);
    setShowErrorMsg(false);
    setErrorMsg("");
  };

  const toggleCheckBox = () => setIsChecked((prev) => !prev);

  const onSubmitSuccess = (jwtToken) => {
    Cookies.set("jwt_token", jwtToken, { expires: 30 });
    navigate("/", { replace: true });
  };

  const onSubmitFailure = (errorMsg) => {
    setErrorMsg(errorMsg);
    setShowErrorMsg(true);
  };

  const getLogin = async (event) => {
    event.preventDefault();
    const apiUrl = `${import.meta.env.VITE_API_URL}/nxtwatch/login`;
    const userDetails = { email, password };
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userDetails),
    };

    const response = await fetch(apiUrl, options);
    const data = await response.json();

    if (response.ok === true) {
      onSubmitSuccess(data.jwtToken);
    } else {
      onSubmitFailure(data.errorMsg);
    }
  };

  const jwtToken = Cookies.get("jwt_token");
  if (jwtToken !== undefined) {
    return <Navigate to="/" />;
  }

  return (
    <LoginContainer $isDarkMode={isDarkMode}>
      <FormConatiner onSubmit={getLogin} $isDarkMode={isDarkMode}>
        {isDarkMode ? (
          <ImageElement
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png"
            alt="website logo"
          />
        ) : (
          <ImageElement
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
            alt="website logo"
          />
        )}

        <LabelAndInputConatiner>
          <LabelElement htmlFor="email" $isDarkMode={isDarkMode}>
            E-MAIL
          </LabelElement>
          <InputElement
            id="email"
            placeholder="E-Mail"
            type="text"
            onChange={changeEmail}
            value={email}
            $isDarkMode={isDarkMode}
          />
        </LabelAndInputConatiner>

        <LabelAndInputConatiner>
          <LabelElement htmlFor="password" $isDarkMode={isDarkMode}>
            PASSWORD
          </LabelElement>
          <InputElement
            id="password"
            placeholder="Password"
            type={isChecked ? "text" : "password"}
            value={password}
            onChange={changePassword}
            $isDarkMode={isDarkMode}
          />
        </LabelAndInputConatiner>

        <LabelAndInputConatiner $checkBoxElement>
          <InputElement
            id="showPassword"
            type="checkbox"
            $checkBoxElement
            onChange={toggleCheckBox}
            $isDarkMode={isDarkMode}
          />
          <LabelElement
            $checkBoxLabel
            htmlFor="showPassword"
            $isDarkMode={isDarkMode}
          >
            Show Password
          </LabelElement>
        </LabelAndInputConatiner>

        {showErrorMsg && <ErrorMsg>{errorMsg}</ErrorMsg>}

        <LoginButton type="submit">Login</LoginButton>

        <AuthRedirectText>
          Don’t have an account?
          <AuthRedirectLink
            onClick={() => navigate("/register", { replace: true })}
          >
            Sign up
          </AuthRedirectLink>
        </AuthRedirectText>
      </FormConatiner>
    </LoginContainer>
  );
};

export default Login;
