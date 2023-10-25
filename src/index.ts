import express, { Request, Response, Application } from "express";
import fs from "fs";
import { startSession } from "./config/postgres";
import { idToMusic } from "./config/constants";
import { serVerFetch } from "./model/helper/fetchHelper";

import configApp from "./config";
const app: Application = express();
app.use(configApp);

app.get("/", async (req: Request, res: Response) => {
  const link = await serVerFetch("UxxajLWwzqY");
  res.send(link);
});

app.get("/stream", (req, res) => {
  fs.readFile(idToMusic("UxxajLWwzqY"), (err, buffer) => {
    if (err) return res.send(err);
    res.send(buffer);
  });
});

app.get("/stream:id", (req, res) => {
  fs.readFile(idToMusic(req.params.id), (err, buffer) => {
    if (err) return res.send(err);
    res.send(buffer);
  });
});

app.listen(3000, async () => {
  console.log("hello compile2");
  startSession();
});
// https://hub.docker.com/repository/docker/dat93docker/musicbackend/general
// make a docker image for postgres + nodejs
// make env for production
// route: user, music, auth, room
// database contain: user, music, refresh session in cookie + access token
// tech: websocket for chat, save music file for user streaming
// https://www.npmjs.com/package/fluent-ffmpeg
// https://www.youtube.com/watch?v=UxxajLWwzqY => UxxajLWwzqY
