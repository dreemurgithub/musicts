import * as yt from "youtube-search-without-api-key";

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

export { musicSearch };
