import { useEffect, useState, useContext } from "react";
import ReactPlayer from "react-player";
import Cookies from "js-cookie";
import { formatDistanceToNow } from "date-fns";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { MdPlaylistAdd } from "react-icons/md";
import FilterGroup from "../FilterGroup";
import Header from "../Header";
import SavedContext from "../../context/SavedContext";

import {
  VideoItemDetailsContainer,
  VideoDescriptionContainer,
  DescriptionContainer,
  ProfileImage,
  VideoTitle,
  ChannelName,
  ChannelViewsAndDate,
  ChannelViewsAndDateContainer,
  LikeSaveContainer,
  LikeSaveChannelViewsContainer,
  ChannelViewsAndDescriptionContainer,
  VideoDetailsWrapperContainer,
  CustomButton,
  ResultsWrapperContainer,
  LoaderContainer,
  RenderLoader,
  Description,
  HorizontalRule,
  FilterGroupContainer,
  PlayerWrapper,
} from "./StyledComponents";

const VideoItemDetails = (props) => {
  const [videoData, setVideoData] = useState({});
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const {
    isDarkMode,
    savedList,
    addSavedVideos,
    removeSavedVideo,
    changeCategory,
    activeCategoryId,
    categoriesList,
    showSideBar,
  } = useContext(SavedContext);

  useEffect(() => {
    getVideoDetails();
  }, []);

  const getVideoDetails = async () => {
    const jwtToken = Cookies.get("jwt_token");
    const { id } = props.params;
    const apiUrl = `http://localhost:4000/videos/${id}`;

    const response = await fetch(apiUrl, {
      method: "GET",
      headers: { Authorization: `Bearer ${jwtToken}` },
    });

    if (response.ok) {
      const data = await response.json();
      setVideoData(data.videoData);
      setIsLoading(false);
    }
  };

  const toggleLike = () => {
    setIsLiked((prev) => !prev);
    setIsDisliked((prev) => (isLiked ? prev : false));
  };

  const toggleDislike = () => {
    setIsDisliked((prev) => !prev);
    setIsLiked((prev) => (isDisliked ? prev : false));
  };

  const toggleSave = (isSaved) => {
    if (isSaved) {
      removeSavedVideo(videoData.id);
    } else {
      addSavedVideos(videoData);
    }
  };

  const renderLoading = () => (
    <LoaderContainer data-testid="loader">
      <RenderLoader $isDarkMode={isDarkMode} />
    </LoaderContainer>
  );

  const renderVideoDetails = () => {
    const { channel, publishedAt, title, viewCount, videoUrl, description } =
      videoData;

    const isSaved = savedList.some((video) => video.id === videoData.id);

    return (
      <VideoDetailsWrapperContainer>
        <PlayerWrapper>
          <ReactPlayer url={videoUrl} controls width="100%" height="100%" />
        </PlayerWrapper>

        <VideoDescriptionContainer>
          <DescriptionContainer>
            <VideoTitle $isDarkMode={isDarkMode}>{title}</VideoTitle>

            <LikeSaveChannelViewsContainer>
              <ChannelViewsAndDateContainer>
                <ChannelViewsAndDate $isDarkMode={isDarkMode}>
                  {viewCount} views
                </ChannelViewsAndDate>
                <ChannelViewsAndDate $isDarkMode={isDarkMode}>
                  {formatDistanceToNow(new Date(publishedAt), {
                    addSuffix: true,
                  })}
                </ChannelViewsAndDate>
              </ChannelViewsAndDateContainer>

              <LikeSaveContainer>
                <CustomButton
                  type="button"
                  onClick={toggleLike}
                  $isLiked={isLiked}
                  $isDarkMode={isDarkMode}
                >
                  <AiOutlineLike /> Like
                </CustomButton>

                <CustomButton
                  type="button"
                  onClick={toggleDislike}
                  $isDisliked={isDisliked}
                  $isDarkMode={isDarkMode}
                >
                  <AiOutlineDislike /> Dislike
                </CustomButton>

                <CustomButton
                  type="button"
                  onClick={() => toggleSave(isSaved)}
                  $isSaved={isSaved}
                  $isDarkMode={isDarkMode}
                >
                  <MdPlaylistAdd /> {isSaved ? "Saved" : "Save"}
                </CustomButton>
              </LikeSaveContainer>
            </LikeSaveChannelViewsContainer>

            <HorizontalRule $isDarkMode={isDarkMode} />

            <ChannelViewsAndDateContainer>
              {channel.profileImageUrl && (
                <ProfileImage
                  src={channel.profileImageUrl}
                  alt="channel logo"
                />
              )}
              <ChannelViewsAndDescriptionContainer>
                <ChannelName $isDarkMode={isDarkMode}>
                  {channel.name}
                </ChannelName>
                <ChannelViewsAndDate $isDarkMode={isDarkMode}>
                  {channel.subscribersCount} subscribers
                </ChannelViewsAndDate>
                <Description $isDarkMode={isDarkMode}>
                  {description}
                </Description>
              </ChannelViewsAndDescriptionContainer>
            </ChannelViewsAndDateContainer>
          </DescriptionContainer>
        </VideoDescriptionContainer>
      </VideoDetailsWrapperContainer>
    );
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

        <VideoItemDetailsContainer
          $isDarkMode={isDarkMode}
          data-testid="videoItemDetails"
        >
          {isLoading ? renderLoading() : renderVideoDetails()}
        </VideoItemDetailsContainer>
      </ResultsWrapperContainer>
    </>
  );
};

export default VideoItemDetails;
