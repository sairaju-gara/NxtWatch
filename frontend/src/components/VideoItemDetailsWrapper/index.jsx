import { useParams } from "react-router-dom";
import VideoItemDetails from "../VideoItemDetails";

const VideoItemDetailsWrapper = (props) => {
  const params = useParams();
  return <VideoItemDetails {...props} params={params} />;
};

export default VideoItemDetailsWrapper;
