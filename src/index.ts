import express, { Request, Response, Application } from "express";
import { startSession } from "./config/postgres";
import { serVerFetch } from "./model/helper/fetchHelper";

import configApp from "./config";
import controller from "./controller";
const app: Application = express();
app.use(controller)
app.use(configApp);

app.get("/", async (req: Request, res: Response) => {
  const link = await serVerFetch("UxxajLWwzqY");
  res.send(link);
});


app.listen(3000, async () => {
  console.log("hello compile2");
  startSession();
});
// get all id by checking the the data folder, if id post is not in => Fail/download?
// middleware check session, allow post auth + post user
// user table + music playlist with user id and music id + music infor that contain the youtube id + other id => 3 table + session === 4
// will make 2 function call to get stream + infor
