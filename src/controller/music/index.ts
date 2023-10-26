import express, { Request, Response, Application } from "express";
import { URLRoute, idToMusic } from "../../config/constants";
import fs from "fs";
import NodeID3 from "node-id3";

const musicRoute: Application = express();

musicRoute.get(
  `${URLRoute.musicInfor}/:id`,
  async (req: Request, res: Response) => {
    NodeID3.read(idToMusic(req.params.id), (err: any, tags: any) => {
      if (err) return res.send(err);
      const {title, album, artist} = tags
      return res.send({title, album, artist});
    });
  }
);
export default musicRoute;
