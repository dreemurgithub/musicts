import express, { Request, Response, Application } from "express";
// import * as fs from "fs/promises";
import fs from "fs";
import axios from "axios";
import path from "path";
import cors from "cors";
const userKien = "3bf4954acamsh48f32682bcd1385p11173ajsn349424d2e603";
const options = {
  method: "GET",
  url: "https://youtube-mp36.p.rapidapi.com/dl",
  params: { id: "UxxajLWwzqY" },
  headers: {
    "X-RapidAPI-Key": userKien,
    "X-RapidAPI-Host": "youtube-mp36.p.rapidapi.com",
  },
};
const app: Application = express();
// app.use(cors({ origin: "*" }));
app.use(
  cors({
    origin: ["*"],
    allowedHeaders: ["*"],
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
import dotenv from "dotenv";
dotenv.config();
import { Pool } from "pg";

const pool = new Pool({
  port: process.env.POSTGRES_PORT && parseInt(process.env.POSTGRES_PORT)? parseInt(process.env.POSTGRES_PORT) : 5432, // Postgres server port[s]
  // database: `${process.env.POSTGRES_DB}`, // Name of database to connect to
  // user: `${process.env.POSTGRES_USER}`, // Username of database user
  // password: `${process.env.POSTGRES_PASSWORD}`, // Password of database user
  // host: `${process.env.POSTGRES_LOCAL}`, // for docker-compose up db, to just run the database
  // host:  process.env.POSTGRES_HOST, // this is for docker-compose up

  database: process.env.POSTGRES_DB, // Name of database to connect to
  user: process.env.POSTGRES_USER, // Username of database user
  password: process.env.POSTGRES_PASSWORD, // Password of database user
  host: process.env.POSTGRES_LOCAL, // for docker-compose up db, to just run the database
  // host:  process.env.POSTGRES_HOST, // this is for docker-compose up

});

console.log('pool',pool);


app.get("/", async (req: Request, res: Response) => {
  try {
    const response = await axios.request(options);
    console.log(response.data.link);
    // https://mgamma.123tokyo.xyz/get.php/6/29/UxxajLWwzqY.mp3?cid=MmEwMTo0Zjg6YzAxMDo5ZmE2OjoxfE5BfERF&h=Oqvwx8gZo_IYun3GIIA6CQ&s=1698148810&n=Icona%20Pop%20-%20I%20Love%20It%20%28feat.%20Charli%20XCX%29%20%5BOFFICIAL%20VIDEO%5D
    // fetch this and download
    res.send(response.data.link);
  } catch (error) {
    res.send(error);
  }
});

app.get("/a", async (req: Request, res: Response) => {});

app.get("/stream", (req, res) => {
  const file = path.join(
    __dirname,
    "./data/12 - Look On Down From The Bridge.mp3"
  );
  fs.readFile(file, (err, buffer) => {
    if (err) {
      return res.send(err);
    }
    res.send(buffer);
  });
});

app.listen(3000, async () => {
  const client = await pool.connect();

  // users_session exists?
  const querySession = `SELECT EXISTS (
        SELECT 1
        FROM pg_tables
        WHERE tablename = 'user_sessions'
        );`;

  const sessionExist = await pool.query(querySession);

  if (!sessionExist.rows[0].exists) {
    const createSessionTable = `CREATE TABLE user_sessions (sid varchar NOT NULL COLLATE "default",
          sess json NOT NULL, expire timestamp(6) NOT NULL );`;
    const addConstrant = `ALTER TABLE user_sessions ADD CONSTRAINT user_sessions_sid_unique UNIQUE (sid);`;
    //  error: there is no unique or exclusion constraint matching the ON CONFLICT specification => addCONSTRAINT fix this
    await pool.query(createSessionTable);
    await pool.query(addConstrant);
  }

  client.release();
});
// https://hub.docker.com/repository/docker/dat93docker/musicbackend/general
// make a docker image for postgres + nodejs
// make env for production
// route: user, music, auth, room
// database contain: user, music, refresh session in cookie + access token
// tech: websocket for chat, save music file for user streaming
// https://www.npmjs.com/package/fluent-ffmpeg
//
