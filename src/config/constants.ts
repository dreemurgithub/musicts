"use strict";
import fs from "fs";
import path from "path";
import { musicInforFromId } from "../model/helper/fetchHelper";
const URLRoute = {
  userInfor: "/user",
  auth: "/auth",
  musicStream: "/listen",
  musicInfor: "/music",
};

const allMusicId = () => {
  const file = path.join(__dirname, `../../data`);
  const fileList = fs.readdirSync(file);
  return fileList;
};

const idToMusic = (id: String) => {
  const file = path.join(
    __dirname,
    `../../data/${id}`
  );
  const fileList = fs.readdirSync(file);
  return path.join(file, fileList[0]);
};

const allMusicName = () => {
  const musicHash: any = {};
  const allMusicIdArr = allMusicId();
  const allName = allMusicIdArr.map((el) => musicInforFromId(el));
  allName.forEach((result) => {
    if (result.success && result.data) musicHash[result.data.id] = result.data;
  });
  return musicHash;
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

const dataFolder = path.join(__dirname, "../dist/data");

const regex5minLess = /^(1:([0-5][0-9])|(2|3|4):[0-5][0-9])$/

export { URLRoute, idToMusic, options, dataFolder, allMusicId, allMusicName ,regex5minLess, };
