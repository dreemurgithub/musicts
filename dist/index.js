"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import * as fs from "fs/promises";
const fs_1 = __importDefault(require("fs"));
const axios_1 = __importDefault(require("axios"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
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
const app = (0, express_1.default)();
// app.use(cors({ origin: "*" }));
app.use((0, cors_1.default)({
    origin: ["*"],
    allowedHeaders: ["*"],
    methods: ["GET", "POST", "PUT", "DELETE"],
}));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const pg_1 = require("pg");
const pool = new pg_1.Pool({
    port: process.env.POSTGRES_PORT && parseInt(process.env.POSTGRES_PORT) ? parseInt(process.env.POSTGRES_PORT) : 5432,
    // database: `${process.env.POSTGRES_DB}`, // Name of database to connect to
    // user: `${process.env.POSTGRES_USER}`, // Username of database user
    // password: `${process.env.POSTGRES_PASSWORD}`, // Password of database user
    // host: `${process.env.POSTGRES_LOCAL}`, // for docker-compose up db, to just run the database
    // host:  process.env.POSTGRES_HOST, // this is for docker-compose up
    database: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    host: process.env.POSTGRES_LOCAL, // for docker-compose up db, to just run the database
    // host:  process.env.POSTGRES_HOST, // this is for docker-compose up
});
console.log('pool', pool);
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.request(options);
        console.log(response.data.link);
        // https://mgamma.123tokyo.xyz/get.php/6/29/UxxajLWwzqY.mp3?cid=MmEwMTo0Zjg6YzAxMDo5ZmE2OjoxfE5BfERF&h=Oqvwx8gZo_IYun3GIIA6CQ&s=1698148810&n=Icona%20Pop%20-%20I%20Love%20It%20%28feat.%20Charli%20XCX%29%20%5BOFFICIAL%20VIDEO%5D
        // fetch this and download
        res.send(response.data.link);
    }
    catch (error) {
        res.send(error);
    }
}));
app.get("/a", (req, res) => __awaiter(void 0, void 0, void 0, function* () { }));
app.get("/stream", (req, res) => {
    const file = path_1.default.join(__dirname, "./data/12 - Look On Down From The Bridge.mp3");
    fs_1.default.readFile(file, (err, buffer) => {
        if (err) {
            return res.send(err);
        }
        res.send(buffer);
    });
});
app.listen(3000, () => __awaiter(void 0, void 0, void 0, function* () {
    const client = yield pool.connect();
    // users_session exists?
    const querySession = `SELECT EXISTS (
        SELECT 1
        FROM pg_tables
        WHERE tablename = 'user_sessions'
        );`;
    const sessionExist = yield pool.query(querySession);
    if (!sessionExist.rows[0].exists) {
        const createSessionTable = `CREATE TABLE user_sessions (sid varchar NOT NULL COLLATE "default",
          sess json NOT NULL, expire timestamp(6) NOT NULL );`;
        const addConstrant = `ALTER TABLE user_sessions ADD CONSTRAINT user_sessions_sid_unique UNIQUE (sid);`;
        //  error: there is no unique or exclusion constraint matching the ON CONFLICT specification => addCONSTRAINT fix this
        yield pool.query(createSessionTable);
        yield pool.query(addConstrant);
    }
    client.release();
}));
// https://hub.docker.com/repository/docker/dat93docker/musicbackend/general
// make a docker image for postgres + nodejs
// make env for production
// route: user, music, auth, room
// database contain: user, music, refresh session in cookie + access token
// tech: websocket for chat, save music file for user streaming
// https://www.npmjs.com/package/fluent-ffmpeg
//
