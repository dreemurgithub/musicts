import express, { Request, Response, Application } from "express";
import cors from "cors";

const configApp: Application = express();
configApp.use((req: Request, res: Response ,next)=>{
  res.setHeader('Access-Control-Allow-Origin', '*');
  next()
})
configApp.use(
    cors({
      origin: ["*"],
      allowedHeaders: ["*"],
      methods: ["GET", "POST", "PUT", "DELETE"],
    })
    );
configApp.use(express.json())


export default configApp