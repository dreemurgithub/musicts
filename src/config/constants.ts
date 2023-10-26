"use strict";
import fs from "fs";
import path from "path";
const URLRoute = {
  userInfor: "/user",
  auth: "/auth",
  musicStream: "/listen",
  musicInfor: "/music",
};
const idToMusic = (id: String) => {
  const file = path.join(
    __dirname,
    `../data/${id}`
    // "./data/12 - Look On Down From The Bridge.mp3",
  );
  const fileList = fs.readdirSync(file);
  return path.join(file, fileList[0]);
};
const userKien = "3bf4954acamsh48f32682bcd1385p11173ajsn349424d2e603";

const options = (id: string) => {
  return {
    method: "GET",
    url: "https://youtube-mp36.p.rapidapi.com/dl",
    params: { id },
    headers: {
      "X-RapidAPI-Key": userKien,
      "X-RapidAPI-Host": "youtube-mp36.p.rapidapi.com",
    },
  };
};

const dataFolder = path.join(__dirname,'../../dist/data')

export { URLRoute, idToMusic, options ,dataFolder};
