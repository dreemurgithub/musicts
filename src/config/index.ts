import dotenv from "dotenv";
dotenv.config();
const localDev = process.env.ENVIROMENT === "DEV";
import express, { Request, Response, Application } from "express";
import cors from "cors";
import session from "express-session";
import { pool } from "./postgres";
import connectPgSimple from "connect-pg-simple"; 

const pgSession = connectPgSimple(session)

const configApp: Application = express();
configApp.use((req: Request, res: Response, next: any) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

configApp.use(
  session({
    secret: `${process.env.SECRETSESSION}`,
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days,
      sameSite: localDev ? "lax" : "none",
      secure: localDev ? "auto" : true,
      httpOnly: true
    },
    store: new pgSession({
      pool,
      tableName:'user_sessions'
    }),
  })
);

configApp.use(cors({ origin: "*" }));
configApp.use(express.json());

export default configApp;
