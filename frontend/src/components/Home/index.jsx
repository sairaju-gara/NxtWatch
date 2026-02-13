import { useEffect, useState, useContext } from "react";
import Cookies from "js-cookie";
import { BsSearch } from "react-icons/bs";
import { FiX } from "react-icons/fi";

import SavedContext from "../../context/SavedContext";
import FilterGroup from "../FilterGroup";
import Header from "../Header";
import VideosCard from "../VideosCard";

import {
  HomeConatainer,
  HomeInnerConatainer,
  BannerConatiner,
  ImageElement,
  BannerDescription,
  BannerButton,
  HomeVideosContainer,
  SearchElement,
  SearchContainer,
  FailureViewContainer,
  FailureImageElement,
  FailureViewHeader,
  FailureViewMessage,
  RetryButton,
  SearchButton,
  BannerCloseButton,
  BannerInnerContainer,
  LoaderContainer,
  ResultsWrapperContainer,
  NoresultsImageElement,
  NoresultsViewHeader,
  NoresultsViewMessage,
  RenderLoader,
  FilterGroupContainer,
} from "./StyledComponents";

const apiStatusConstants = {
  initial: "INITIAL",
  apiSuccessView: "SUCCESS",
  apiFaliureView: "FAILURE",
  apiLoadingView: "LOADING",
  apiNoResultsView: "NO RESULTS",
};

const Home = () => {
  const [videosList, setVideosList] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);
  const [showBanner, setShowBanner] = useState(true);

  const {
    isDarkMode,
    categoriesList,
    changeCategory,
    showSideBar,
    activeCategoryId,
  } = useContext(SavedContext);

  useEffect(() => {
    getVideos();
  }, []);

  const handleCloseButton = () => setShowBanner(false);

  const getVideos = async () => {
    setApiStatus(apiStatusConstants.apiLoadingView);
    const jwtToken = Cookies.get("jwt_token");

    const apiUrl = `${import.meta.env.VITE_API_URL}/home/getHomeVideos?search=${searchInput}`;
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
    };

    const response = await fetch(apiUrl, options);
    if (response.ok === true) {
      const data = await response.json();
      if (data.homeVideosData.length === 0) {
        setApiStatus(apiStatusConstants.apiNoResultsView);
        return;
      }
      setVideosList(data.homeVideosData);
      setApiStatus(apiStatusConstants.apiSuccessView);
    } else {
      setApiStatus(apiStatusConstants.apiFaliureView);
    }
  };

  const changeSearchInput = (event) => {
    setSearchInput(event.target.value);
  };

  const enterSearchInput = () => getVideos();

  const renderVideosListView = () => (
    <HomeVideosContainer>
      {videosList.map((eachVideo) => (
        <VideosCard key={eachVideo._id} videoDetails={eachVideo} />
      ))}
    </HomeVideosContainer>
  );

  const renderNoResultsFoundView = () => (
    <FailureViewContainer $showBanner={showBanner}>
      <NoresultsImageElement
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
        alt="no videos"
      />
      <NoresultsViewHeader $isDarkMode={isDarkMode}>
        No Search results found
      </NoresultsViewHeader>
      <NoresultsViewMessage $isDarkMode={isDarkMode}>
        Try different key words or remove search filter
      </NoresultsViewMessage>
      <RetryButton onClick={getVideos}>Retry</RetryButton>
    </FailureViewContainer>
  );

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

  const renderFinalResultsView = () => {
    switch (apiStatus) {
      case apiStatusConstants.apiFaliureView:
        return renderFailureView();
      case apiStatusConstants.apiLoadingView:
        return renderLoadingView();
      case apiStatusConstants.apiNoResultsView:
        return renderNoResultsFoundView();
      case apiStatusConstants.apiSuccessView:
        return renderVideosListView();
      default:
        return null;
    }
  };

  const renderVideosList = () => (
    <HomeInnerConatainer>
      {showBanner && (
        <BannerConatiner data-testid="banner">
          <BannerInnerContainer>
            <ImageElement
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
              alt="nxt watch logo"
            />
            <BannerDescription>
              Buy NXT Watch premium prepaid plans with UPI
            </BannerDescription>
            <BannerButton>GET IT NOW</BannerButton>
          </BannerInnerContainer>
          <BannerCloseButton
            type="button"
            data-testid="close"
            onClick={handleCloseButton}
          >
            <FiX />
          </BannerCloseButton>
        </BannerConatiner>
      )}
      <SearchContainer $isDarkMode={isDarkMode}>
        <SearchElement
          type="search"
          placeholder="Search"
          onChange={changeSearchInput}
          value={searchInput}
          $isDarkMode={isDarkMode}
        />
        <SearchButton
          data-testid="searchButton"
          type="button"
          $isDarkMode={isDarkMode}
        >
          <BsSearch onClick={enterSearchInput} />
        </SearchButton>
      </SearchContainer>
      {renderFinalResultsView()}
    </HomeInnerConatainer>
  );

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
        <HomeConatainer data-testid="home" $isDarkMode={isDarkMode}>
          {renderVideosList()}
        </HomeConatainer>
      </ResultsWrapperContainer>
    </>
  );
};

export default Home;
