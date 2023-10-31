import express, { Request, Response, Application } from "express";
import { startSession } from "./config/postgres";
import {
  userPlaylist,
  songsinPlaylist,
  addSongToPlaylist,
  makeUserDir,
  makePlaylist,
} from "./model/helper/playlist";
import configApp from "./config";
import controller from "./controller";
const app: Application = express();
app.use(configApp);
app.use(controller);

const port = process.env.port || 3000;

app.listen(port, async () => {
  console.log(`port ${port} is listening`);
  startSession();
  // makeUserDir(2)
  // makePlaylist({ playlistName: "abc", userId: 2 });

  // addSongToPlaylist({
  //   userId: 3,
  //   playlistName: "2",
  //   youtubeId: "Zasx9hjo4WY",
  // });
  // console.log(songsinPlaylist({playlistName: '1', userId: 2}))
  
});
// listen to music from playlist will accept {current: string, other: [string,string]}
