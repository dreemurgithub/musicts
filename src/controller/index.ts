import express, { Request, Response, Application } from "express";
import middleWare from "./middleware";
import listenRoute from "./streamMusic";
import musicRoute from "./inforMusic";
import authRoute from "./auth";

const controller: Application = express();
controller.use(middleWare)
controller.use(listenRoute)
controller.use(musicRoute)
controller.use(authRoute)
export default controller
