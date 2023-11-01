import express, { Request, Response, Application } from "express";
import { URLRoute, idToMusic } from "@/config/constants";
import { musicInforFromId } from "@/model/helper/fetchHelper";
import { makeUser,editUser } from "@/model/User";
interface CustomRequest extends Request {
  session: any; // Replace `any` with the appropriate type for your session data
}

const userRoute: Application = express();


userRoute.post(`${URLRoute.userInfor}`,async (req: Request, res: Response) => { // make new user
  const {username, name, password} = req.body
  const result = await makeUser({name,password,username});
  if (result.success) return res.status(201).send(result.data);
  else return res.status(400).send(result.message);
})

userRoute.put(`${URLRoute.userInfor}`,async (req: Request, res: Response) => { // make new user
  const newReq = req as CustomRequest
  // const id = newReq.session.id
  const {username, name, password,id} = req.body
  const result = await editUser({name,password,username,id});
  if (result.success) return res.status(201).send(result.data);
  else return res.status(400).send(result.message);
})
export default userRoute;
