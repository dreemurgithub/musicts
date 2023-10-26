import express, { Request, Response, Application } from "express";
import { URLRoute, idToMusic, allMusicId } from "../../config/constants";
import fs from "fs";
import { downloadMusic } from "../../model/helper/fetchHelper";

const listenRoute: Application = express();

listenRoute.get( // all music
  `${URLRoute.musicStream}`,
  async (req: Request, res: Response) => {
    const allId = allMusicId();
    return res.status(200).send(allId);
  }
);

listenRoute.get( // one music
  `${URLRoute.musicStream}/:id`,
  async (req: Request, res: Response) => {
    fs.readFile(idToMusic(req.params.id), (err, buffer) => {
      if (err) return res.send(err);
      res.send(buffer);
    });
  }
);
listenRoute.post(
    `${URLRoute.musicStream}`, // search music
    async (req: Request, res: Response) => {
      const { id } = req.body;
      const result = await downloadMusic(id);
      if (result.success) return res.status(200).send(result.data);
      else return res.status(400).send(result.message);
    }
  );

listenRoute.put(
  `${URLRoute.musicStream}`, // download music
  async (req: Request, res: Response) => {
    const { id } = req.body;
    const result = await downloadMusic(id);
    if (result.success) return res.status(200).send(result.data);
    else return res.status(400).send(result.message);
  }
);

export default listenRoute;
