import styled from "styled-components";

export const AuthRedirectText = styled.p`
  font-size: 14px;
  color: ${(props) => (props.isDarkMode ? "#ffffff" : "#606060")};
  text-align: center;
  margin-top: 16px;
`;

export const AuthRedirectLink = styled.span`
  color: #3b82f6;
  font-weight: 600;
  cursor: pointer;
  margin-left: 4px;

  &:hover {
    text-decoration: underline;
  }
`;

export const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: ${(props) => (props.$isDarkMode ? "#000000" : "#ffffff")};
`;

export const FormConatiner = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 30px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  background-color: ${(props) => (props.$isDarkMode ? "#1e293b" : "#ffffff")};

  @media (max-width: 320px) {
    width: 200px;
  }

  @media (max-width: 767px) {
    width: 300px;
  }
`;

export const ImageElement = styled.img`
  height: 30px;
  width: 110px;
  align-self: center;
  margin-bottom: 10px;
`;

export const LabelAndInputConatiner = styled.div`
  display: flex;
  flex-direction: ${(props) => (props.$checkBoxElement ? "row" : "column")};
  align-items: ${(props) => (props.$checkBoxElement ? "center" : "flex-start")};
  gap: ${(props) => (props.$checkBoxElement ? "4px" : "6px")};
  margin-bottom: 12px;

  @media (max-width: 767px) {
    width: 200px;
  }
`;

export const InputElement = styled.input`
  height: ${(props) => (props.$checkBoxElement ? "14px" : "40px")};
  width: ${(props) => (props.$checkBoxElement ? "14px" : "300px")};
  border-radius: 6px;
  border: 1px solid ${(props) => (props.$isDarkMode ? "#475569" : "#cbd5e1")};
  background-color: ${(props) => (props.$isDarkMode ? "#0f172a" : "#f8fafc")};
  color: ${(props) => (props.$isDarkMode ? "#f1f5f9" : "#1e293b")};
  padding: ${(props) => (props.$checkBoxElement ? "0" : "0 12px")};
  outline: none;
  transition: all 0.3s ease;

  &::placeholder {
    color: ${(props) => (props.$isDarkMode ? "#94a3b8" : "#94a3b8")};
    font-size: 13px;
  }

  &:focus {
    border-color: #6366f1;
    box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.3);
  }

  @media (max-width: 767px) {
    width: ${(props) => (props.$checkBoxElement ? "14px" : "200px")};
    height: ${(props) => (props.$checkBoxElement ? "14px" : "36px")};
    font-size: 13px;
  }
`;

export const LabelElement = styled.label`
  font-size: 13px;
  color: ${(props) => (props.$isDarkMode ? "#e2e8f0" : "#334155")};
  font-family: Roboto, sans-serif;
  margin-bottom: 4px;
  width: 100px;
  position: ${(props) => (props.$checkBoxLabel ? "relative" : "static")};
  top: ${(props) => (props.$checkBoxLabel ? "2px" : "0")};

  @media (max-width: 767px) {
    font-size: 12px;
  }
`;

export const LoginButton = styled.button`
  color: #ffffff;
  height: 40px;
  width: 300px;
  border-radius: 6px;
  background-color: #4f46e5;
  font-size: 14px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #4338ca;
  }

  @media (max-width: 767px) {
    height: 36px;
    width: 200px;
    margin-bottom: 10px;
    font-size: 13px;
  }
`;

export const ErrorMsg = styled.p`
  font-size: 12px;
  color: #ef4444;

  @media (max-width: 767px) {
    font-size: 11px;
  }
`;
