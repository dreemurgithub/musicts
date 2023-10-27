import * as yt from "youtube-search-without-api-key";
import {
  downloadMusic,
  musicInforFromId,
  downloadMusicQueue,
} from "../helper/fetchHelper";
import { allMusicId, regex5minLess } from "../../config/constants";
/**
 * Given a search query, searching on youtube
 * @param {string} search value (string or videoId).
 */
const musicSearch = async (search: string) => {
  const videos = await yt.search(search);
  const result = videos.filter((el) => regex5minLess.test(el.duration_raw));
  //   const videos = await yt.search("y5kIrbG2gRc");
  return result;
};

const checkDuration = async (id: string) => {
  const videosIdArr = await yt.search(id);
  if (!regex5minLess.test(videosIdArr[0].duration_raw)) return false;
  return true;
};

const downloadMusicCheck = async (id: string) => {
  const check = await checkDuration(id);
  if (!check)
    return {
      success: false,
      message: "Duration must be less than 5 minutes",
    };
  const allId = allMusicId();
  if (!allId.includes(id)) return downloadMusic(id);
  return musicInforFromId(id);
};

const downloadMusicCheckQueue = async(id: string) => {
  const check = await checkDuration(id);
  const allId = allMusicId();
  if (!allId.includes(id) && check) return downloadMusicQueue(id);
};

export { musicSearch, downloadMusicCheck, downloadMusicCheckQueue };
