import express, { Request, Response, Application } from "express";
// import * as fs from "fs/promises";
import fs from "fs";
import axios from "axios";
import path from "path";
const userKien = "3bf4954acamsh48f32682bcd1385p11173ajsn349424d2e603";
const options = {
  method: "GET",
  url: "https://youtube-mp36.p.rapidapi.com/dl",
  params: { id: "UxxajLWwzqY" },
  headers: {
    "X-RapidAPI-Key": userKien,
    "X-RapidAPI-Host": "youtube-mp36.p.rapidapi.com",
  },
};

const app: Application = express();

app.get("/", async (req: Request, res: Response) => {
  try {
    const response = await axios.request(options);
    console.log(response.data.link);
    // https://mgamma.123tokyo.xyz/get.php/6/29/UxxajLWwzqY.mp3?cid=MmEwMTo0Zjg6YzAxMDo5ZmE2OjoxfE5BfERF&h=Oqvwx8gZo_IYun3GIIA6CQ&s=1698148810&n=Icona%20Pop%20-%20I%20Love%20It%20%28feat.%20Charli%20XCX%29%20%5BOFFICIAL%20VIDEO%5D
    // fetch this and download
    res.send(response.data.link);
  } catch (error) {
    res.send(error);
  }
});

app.get("/a", async (req: Request, res: Response) => {
  const ffmpeg = require("fluent-ffmpeg");
  const command = ffmpeg("./data/12 - Look On Down From The Bridge.mp3");
});

app.get("/stream", (req, res) => {
  const file = path.join(
    __dirname,
    "./data/12 - Look On Down From The Bridge.mp3"
  );
  fs.readFile(file, (err, buffer) => {
    if (err) {
      return res.send(err);
    }
    console.log(buffer.length); // prints the size of the file in bytes
    res.send(buffer);
  });
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
// https://hub.docker.com/repository/docker/dat93docker/musicbackend/general
// make a docker image for postgres + nodejs
// make env for production
// route: user, music, auth, room
// database contain: user, music, refresh session in cookie + access token
// tech: websocket for chat, save music file for user streaming
// https://www.npmjs.com/package/fluent-ffmpeg
//
