import express, { Request, Response, Application } from "express";
import { URLRoute, idToMusic } from "../../config/constants";
import fs from "fs";
import { downloadMusic } from "../../model/helper/fetchHelper";

const listenRoute: Application = express();

listenRoute.get(
  `${URLRoute.musicStream}/:id`,
  async (req: Request, res: Response) => {
    fs.readFile(idToMusic(req.params.id), (err, buffer) => {
      if (err) return res.send(err);
      res.send(buffer);
    });
  }
);
listenRoute.post(
  `${URLRoute.musicStream}/:id`,
  async (req: Request, res: Response) => {
    const newInfor = await downloadMusic(req.params.id)
    res.send(newInfor);
  }
);

export default listenRoute;
