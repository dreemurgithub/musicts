import * as yt from "youtube-search-without-api-key";
import { downloadMusic, musicInforFromId,downloadMusicQueue } from "../helper/fetchHelper";
import { allMusicId } from "../../config/constants";
/**
 * Given a search query, searching on youtube
 * @param {string} search value (string or videoId).
 */
const musicSearch = async (search: string) => {
  console.log(search);
  const videos = await yt.search(search);
  //   const videos = await yt.search("y5kIrbG2gRc");
  return videos;
};

const downloadMusicCheck = (id: string) => {
  const allId = allMusicId();
  if (!allId.includes(id)) return downloadMusic(id);
  return musicInforFromId(id);
};

const downloadMusicCheckQueue = (id: string) => {
    const allId = allMusicId();
    if (!allId.includes(id)) return downloadMusicQueue(id);
  };
  

export { musicSearch ,downloadMusicCheck, downloadMusicCheckQueue};
