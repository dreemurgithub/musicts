import express, { Request, Response, Application } from "express";
import { URLRoute, idToMusic } from "../../config/constants";
import { musicInforFromId } from "../../model/helper/fetchHelper";

const userRoute: Application = express();

userRoute.get(
  `${URLRoute.userInfor}/:id`,
  async (req: Request, res: Response) => {
    const result = musicInforFromId(req.params.id);
    if (result.success) return res.status(200).send(result.data);
    else return res.status(400).send(result.message);
  }
);
export default userRoute;
