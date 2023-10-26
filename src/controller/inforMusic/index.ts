import express, { Request, Response, Application } from "express";
import {
  URLRoute,
  idToMusic,
  allMusicId,
  allMusicName,
} from "../../config/constants";
import { musicInforFromId } from "../../model/helper/fetchHelper";

const musicRoute: Application = express();

musicRoute.get(
  `${URLRoute.musicInfor}/:id`,
  async (req: Request, res: Response) => {
    const result = musicInforFromId(req.params.id);
    if (result.success) return res.status(200).send(result.data);
    else return res.status(400).send(result.message);
  }
);

musicRoute.get(
  `${URLRoute.musicInfor}`,
  async (req: Request, res: Response) => {
    const result = allMusicName();
    res.status(200).send(result);
  }
);

export default musicRoute;
