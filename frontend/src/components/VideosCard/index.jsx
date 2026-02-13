import { formatDistanceToNow } from "date-fns";
import { useContext } from "react";
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

const VideosCard = ({ videoDetails }) => {
  const { isDarkMode } = useContext(SavedContext);
  const { _id, channel, publishedAt, thumbnailUrl, title, viewCount } =
    videoDetails;

  return (
    <NavigateLink to={`/videos/${_id}`}>
      <VideoConatiner>
        <ImageElement src={thumbnailUrl} alt="video thumbnail" />
        <VideoDescriptionContainer>
          <ProfileImage src={channel.profileImageUrl} alt="channel logo" />
          <DescriptionContainer $isDarkMode={isDarkMode}>
            <VideoTitle $isDarkMode={isDarkMode}>{title}</VideoTitle>
            <ChannelName $isDarkMode={isDarkMode}>{channel.name}</ChannelName>
            <ViewsAndDateContainer>
              <ChannelViewsAndDate $isDarkMode={isDarkMode}>
                {`${viewCount} views`}
              </ChannelViewsAndDate>
              <ChannelViewsAndDate $isDarkMode={isDarkMode}>
                {`${formatDistanceToNow(new Date(publishedAt)).split(" ")[1]} years ago`}
              </ChannelViewsAndDate>
            </ViewsAndDateContainer>
          </DescriptionContainer>
        </VideoDescriptionContainer>
      </VideoConatiner>
    </NavigateLink>
  );
};

export default VideosCard;
