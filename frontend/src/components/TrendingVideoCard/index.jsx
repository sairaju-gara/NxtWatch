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
  ChannelViewsAndDate,
  ViewsAndDateContainer,
  NavigateLink,
  ChannelName,
} from "./StyledComponents";

const TrendingVideoCard = ({ videoDetails }) => {
  const { _id, channel, publishedAt, thumbnailUrl, title, viewCount } =
    videoDetails;

  const { isDarkMode } = useContext(SavedContext);

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
                {`${formatDistanceToNow(new Date(publishedAt)).split(" ")[1]} years ago`}
              </ChannelViewsAndDate>
            </ViewsAndDateContainer>
          </DescriptionContainer>
        </VideoDescriptionContainer>
      </VideoConatiner>
    </NavigateLink>
  );
};

export default TrendingVideoCard;
