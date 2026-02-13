import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { SiYoutubegaming } from "react-icons/si";
import SavedContext from "../../context/SavedContext";
import GamingVideoCard from "../GamingVideoCard";
import FilterGroup from "../FilterGroup";
import Header from "../Header";

import {
  GamingHeader,
  GamingVideosContainer,
  GamingVideosListContainer,
  FailureViewContainer,
  FailureImageElement,
  FailureViewHeader,
  FailureViewMessage,
  RetryButton,
  LoaderContainer,
  ResultsWrapperContainer,
  RenderLoader,
  FilterGroupContainer,
} from "./StyledComponents";

const apiStatusConstants = {
  intial: "INITIAL",
  apiSuccessView: "SUCCESS",
  apiFaliureView: "FAILURE",
  apiLoadingView: "LOADING",
  apiNoResultsView: "NO RESULTS",
};

const Gaming = () => {
  const [gamingList, setGamingList] = useState([]);
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.intial);

  const {
    isDarkMode,
    categoriesList,
    activeCategoryId,
    changeCategory,
    showSideBar,
  } = useContext(SavedContext);

  useEffect(() => {
    getVideos();
  }, []);

  const getVideos = async () => {
    setApiStatus(apiStatusConstants.apiLoadingView);
    const jwtToken = Cookies.get("jwt_token");
    const apiUrl = `${import.meta.env.VITE_API_URL}/gaming/getGamingVideos`;

    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };

    const response = await fetch(apiUrl, options);

    if (response.ok === true) {
      const data = await response.json();
      setGamingList(data.gamingVideosData);
      setApiStatus(apiStatusConstants.apiSuccessView);
    } else {
      setApiStatus(apiStatusConstants.apiFaliureView);
    }
  };

  const renderLoadingView = () => (
    <LoaderContainer data-testid="loader">
      <RenderLoader
        $isDarkMode={isDarkMode}
        type="ThreeDots"
        height="50"
        width="50"
      />
    </LoaderContainer>
  );

  const renderFailureView = () => (
    <FailureViewContainer>
      {isDarkMode ? (
        <FailureImageElement
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
          alt="failure view"
        />
      ) : (
        <FailureImageElement
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png"
          alt="failure view"
        />
      )}
      <FailureViewHeader $isDarkMode={isDarkMode}>
        Oops! Something Went Wrong
      </FailureViewHeader>
      <FailureViewMessage $isDarkMode={isDarkMode}>
        We are having some trouble to complete your request.
        <br />
        Please try again.
      </FailureViewMessage>
      <Link to="/gaming">
        <RetryButton onClick={getVideos}>Retry</RetryButton>
      </Link>
    </FailureViewContainer>
  );

  const renderGamingResultsView = () => (
    <div>
      <GamingHeader $isDarkMode={isDarkMode}>
        <SiYoutubegaming style={{ marginRight: "8px", color: "#ff0000" }} />
        Gaming
      </GamingHeader>
      <GamingVideosListContainer>
        {gamingList.map((eachVideo) => (
          <GamingVideoCard key={eachVideo._id} videoDetails={eachVideo} />
        ))}
      </GamingVideosListContainer>
    </div>
  );

  const renderFinalResultsView = () => {
    switch (apiStatus) {
      case apiStatusConstants.apiFaliureView:
        return renderFailureView();
      case apiStatusConstants.apiLoadingView:
        return renderLoadingView();
      case apiStatusConstants.apiSuccessView:
        return renderGamingResultsView();
      default:
        return null;
    }
  };

  return (
    <>
      <Header />
      <ResultsWrapperContainer>
        <FilterGroupContainer $showSideBar={showSideBar}>
          <FilterGroup
            changeCategory={changeCategory}
            categoriesList={categoriesList}
            activeCategoryId={activeCategoryId}
            isDarkMode={isDarkMode}
          />
        </FilterGroupContainer>
        <GamingVideosContainer data-testid="gaming" $isDarkMode={isDarkMode}>
          {renderFinalResultsView()}
        </GamingVideosContainer>
      </ResultsWrapperContainer>
    </>
  );
};

export default Gaming;
