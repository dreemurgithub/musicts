import express, { Request, Response, Application } from "express";
import {
  URLRoute,
  idToMusic,
  allMusicId,
  allMusicName,
} from "../../config/constants";
import { musicInforFromId } from "../../model/helper/fetchHelper";
import { musicSearch } from "../../model/Music";
const musicRoute: Application = express();

musicRoute.get(
  // one music infor
  `${URLRoute.musicInfor}/:id`,
  async (req: Request, res: Response) => {
    const result = musicInforFromId(req.params.id);
    if (result.success) return res.status(200).send(result.data);
    else return res.status(400).send(result.message);
  }
);

musicRoute.get(
  // all music on server
  `${URLRoute.musicInfor}`,
  async (req: Request, res: Response) => {
    const result = allMusicName();
    res.status(200).send(result);
  }
);

musicRoute.get(
  // search youtube
  `/search${URLRoute.musicInfor}/:search`,
  async (req: Request, res: Response) => {
    const { search } = req.params;
    const result = await musicSearch(search);
    if (result.success) return res.status(200).send(result.data);
    else return res.status(400).send(result.message);
  }
);

export default musicRoute;
