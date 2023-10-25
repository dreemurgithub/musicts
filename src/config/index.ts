import express, { Request, Response, Application } from "express";
import cors from "cors";

const configApp: Application = express();
configApp.use(
    cors({
      origin: ["*"],
      allowedHeaders: ["*"],
      methods: ["GET", "POST", "PUT", "DELETE"],
    })
    );
export default configApp