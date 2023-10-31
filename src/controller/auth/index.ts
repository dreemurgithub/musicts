import express, { Request, Response, Application } from "express";
import { URLRoute, idToMusic } from "../../config/constants";
import { signIn } from "../../model/User";
import "express-session"; // don't forget to import the original module

const authRoute: Application = express();

authRoute.post(URLRoute.auth, async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const result = await signIn({ username, password });
  if (result.data) req.session.userId = result.data.id;
  if (result.success) return res.status(201).send(result.data);
  else return res.status(400).send(result.message);
});

authRoute.delete(URLRoute.auth, async (req: Request, res: Response) => {
  req.session.destroy((err) => {
    if (err) console.log(err);
  });
  res.clearCookie("connect.sid");
  res.status(200).send("Successfully signing out");
});

export default authRoute;
