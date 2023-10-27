import express, { Request, Response, Application } from "express";
import cors from "cors";

const configApp: Application = express();
configApp.use((req: Request, res: Response, next: any) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});
configApp.use(cors({ origin: "*" }));
configApp.use(express.json());

export default configApp;
