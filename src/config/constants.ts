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
  return path.join(file, fileList[0])
  
};
export { URLRoute, idToMusic };
