import { useContext } from "react";
import { formatDistanceToNow } from "date-fns";
import SavedContext from "../../context/SavedContext";
import {
  VideoConatiner,
  ImageElement,
  VideoDescriptionContainer,
  DescriptionContainer,
  ProfileImage,
  VideoTitle,
  ChannelName,
  ChannelViewsAndDate,
  ViewsAndDateContainer,
  NavigateLink,
} from "./StyledComponents";

const SavedVideosCard = ({ videoDetails }) => {
  const { _id, channel, publishedAt, thumbnailUrl, title, viewCount } =
    videoDetails;
  const { isDarkMode } = useContext(SavedContext);

  const publishedTimeAgo = formatDistanceToNow(new Date(publishedAt), {
    addSuffix: true,
  });

  return (
    <NavigateLink to={`/videos/${_id}`}>
      <VideoConatiner>
        <ImageElement src={thumbnailUrl} alt="video thumbnail" />
        <VideoDescriptionContainer>
          <ProfileImage src={channel.profileImageUrl} alt="channel logo" />
          <DescriptionContainer>
            <VideoTitle $isDarkMode={isDarkMode}>{title}</VideoTitle>
            <ChannelName $isDarkMode={isDarkMode}>{channel.name}</ChannelName>
            <ViewsAndDateContainer>
              <ChannelViewsAndDate $isDarkMode={isDarkMode}>
                {`${viewCount} views`}
              </ChannelViewsAndDate>
              <ChannelViewsAndDate $isDarkMode={isDarkMode}>
                {publishedTimeAgo}
              </ChannelViewsAndDate>
            </ViewsAndDateContainer>
          </DescriptionContainer>
        </VideoDescriptionContainer>
      </VideoConatiner>
    </NavigateLink>
  );
};

export default SavedVideosCard;
