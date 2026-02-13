import { useContext } from "react";
import { FaFire } from "react-icons/fa";
import {
  SavedVideosContainer,
  SavedVideosHeader,
  SavedVideosListContainer,
  NoSavedContainer,
  NoSavedImageElement,
  NoSavedHeader,
  NoSavedMessage,
  SavedVideosWrapperContainer,
  ResultsWrapperContainer,
  FilterGroupContainer,
} from "./StyledComponents";
import SavedContext from "../../context/SavedContext";
import SavedVideosCard from "../SavedVideosCard";
import FilterGroup from "../FilterGroup";
import Header from "../Header";

const SavedVideos = () => {
  const {
    savedList,
    isDarkMode,
    activeCategoryId,
    categoriesList,
    changeCategory,
    showSideBar,
  } = useContext(SavedContext);

  const renderFailureView = () => (
    <NoSavedContainer>
      <NoSavedImageElement
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
        alt="no saved videos"
      />
      <NoSavedHeader $isDarkMode={isDarkMode}>
        No saved videos found
      </NoSavedHeader>
      <NoSavedMessage $isDarkMode={isDarkMode}>
        You can save your videos while watching them
      </NoSavedMessage>
    </NoSavedContainer>
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
        <SavedVideosContainer
          data-testid="savedVideos"
          $isDarkMode={isDarkMode}
        >
          <SavedVideosWrapperContainer>
            <SavedVideosHeader $isDarkMode={isDarkMode}>
              <FaFire style={{ marginRight: "8px", color: "#ff0000" }} />
              Saved Videos
            </SavedVideosHeader>
            <SavedVideosListContainer>
              {savedList.length > 0
                ? savedList.map((eachVideo) => (
                    <SavedVideosCard
                      key={eachVideo._id}
                      videoDetails={eachVideo}
                    />
                  ))
                : renderFailureView()}
            </SavedVideosListContainer>
          </SavedVideosWrapperContainer>
        </SavedVideosContainer>
      </ResultsWrapperContainer>
    </>
  );
};

export default SavedVideos;
