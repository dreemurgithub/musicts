const userKien = "3bf4954acamsh48f32682bcd1385p11173ajsn349424d2e603";
import axios from "axios";

const serVerFetch = async (id: string) => {
  const options = {
    method: "GET",
    url: "https://youtube-mp36.p.rapidapi.com/dl",
    params: { id },
    headers: {
      "X-RapidAPI-Key": userKien,
      "X-RapidAPI-Host": "youtube-mp36.p.rapidapi.com",
    },
  };
  try {
    const response = await axios.request(options);
    return response.data.link;
  } catch (error) {
    console.log(error);
  }
};
const frontEndMusic = async (id: string) => {};

export { serVerFetch, frontEndMusic };
