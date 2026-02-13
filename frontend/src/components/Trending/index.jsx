import { useEffect, useState, useContext } from "react";
import Cookies from "js-cookie";
import { FaFire } from "react-icons/fa";
import SavedContext from "../../context/SavedContext";
import TrendingVideoCard from "../TrendingVideoCard";
import FilterGroup from "../FilterGroup";
import Header from "../Header";

import {
  TrendingHeader,
  TrendingVideosContainer,
  TrendingVideosListContainer,
  FailureViewContainer,
  FailureImageElement,
  FailureViewHeader,
  FailureViewMessage,
  TrendingWrapperContainer,
  LoaderContainer,
  RetryButton,
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

const Trending = () => {
  const [trendingList, setTrendingList] = useState([]);
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.intial);

  const {
    isDarkMode,
    changeCategory,
    activeCategoryId,
    categoriesList,
    showSideBar,
  } = useContext(SavedContext);

  useEffect(() => {
    getVideos();
  }, []);

  const getVideos = async () => {
    setApiStatus(apiStatusConstants.apiLoadingView);
    const jwtToken = Cookies.get("jwt_token");
    const apiUrl = `${import.meta.env.VITE_API_URL}/trending/getTrendingVideos`;

    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };

    const response = await fetch(apiUrl, options);
    if (response.ok === true) {
      const data = await response.json();
      setTrendingList(data.trendingVideosData);
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
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png"
          alt="failure view"
        />
      ) : (
        <FailureImageElement
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
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
      <RetryButton onClick={getVideos}>Retry</RetryButton>
    </FailureViewContainer>
  );

  const renderTrendingResultsView = () => (
    <TrendingWrapperContainer>
      <TrendingHeader $isDarkMode={isDarkMode}>
        <FaFire style={{ marginRight: "8px", color: "#ff0000" }} />
        Trending
      </TrendingHeader>
      <TrendingVideosListContainer>
        {trendingList.map((eachVideo) => (
          <TrendingVideoCard key={eachVideo._id} videoDetails={eachVideo} />
        ))}
      </TrendingVideosListContainer>
    </TrendingWrapperContainer>
  );

  const renderFinalResultsView = () => {
    switch (apiStatus) {
      case apiStatusConstants.apiFaliureView:
        return renderFailureView();
      case apiStatusConstants.apiLoadingView:
        return renderLoadingView();
      case apiStatusConstants.apiSuccessView:
        return renderTrendingResultsView();
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
            $isDarkMode={isDarkMode}
          />
        </FilterGroupContainer>
        <TrendingVideosContainer
          data-testid="trending"
          $isDarkMode={isDarkMode}
        >
          {renderFinalResultsView()}
        </TrendingVideosContainer>
      </ResultsWrapperContainer>
    </>
  );
};

export default Trending;
