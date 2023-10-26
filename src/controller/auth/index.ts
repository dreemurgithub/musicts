import express, { Request, Response, Application } from "express";
import { URLRoute, idToMusic } from "../../config/constants";
import fs from "fs";
import NodeID3 from "node-id3";

const authRoute: Application = express();

authRoute.get(
  `${URLRoute.auth}`,
  async (req: Request, res: Response) => {
    res.send('hello auth')
  }
);
export default authRoute;
