import express, { Request, Response, Application } from "express";
import { startSession } from "./config/postgres";
import { serVerFetch } from "./model/helper/fetchHelper";

import configApp from "./config";
import controller from "./controller";
const app: Application = express();
app.use(configApp);
app.use(controller)

app.get("/", async (req: Request, res: Response) => {
  const link = await serVerFetch("UxxajLWwzqY");
  res.send(link);
});

const port = process.env.port || 3000

app.listen(port, async () => {
  console.log(`port ${port} is listening`);
  startSession();
});
// listen to music from playlist will accept {current: string, other: [string,string]}