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
// get all id by checking the the data folder, if id post is not in => Fail/download?
// middleware check session, allow post auth + post user
// user table + music playlist with user id and music id + music infor that contain the youtube id + other id => 3 table + session === 4
