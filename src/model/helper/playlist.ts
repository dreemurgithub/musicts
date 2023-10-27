import fs from "fs";
import path from "path";
const userPlaylist = (userId: number) => {
  const file = path.join(__dirname, `../../../playlist/${userId}`);
  try {
    return fs.readdirSync(file);
  } catch {
    return "";
  }
};

const songsinPlaylist = ({
  userId,
  playlistName,
}: {
  userId: number;
  playlistName: string;
}) => {
  const file = path.join(
    __dirname,
    `../../../playlist/${userId}/${playlistName}`
  );
  try {
    return fs.readdirSync(file);
  } catch {
    return "";
  }
};
const makeUserDir = (userId: number) => {
  const dir = path.join(__dirname, `../../../playlist/${userId}`);
  try {
    fs.mkdirSync(dir);
  } catch {}
};

const makePlaylist = ({
  userId,
  playlistName,
}: {
  userId: number;
  playlistName: string;
}) => {
  const dir = path.join(
    __dirname,
    `../../../playlist/${userId}/${playlistName}`
  );
  try {
    fs.mkdirSync(dir);
  } catch {}
};

const addSongToPlaylist = ({
  userId,
  playlistName,
  youtubeId,
}: {
  userId: number;
  playlistName: string;
  youtubeId: string;
}) => {
  const dir = path.join(
    __dirname,
    `../../../playlist/${userId}/${playlistName}/${youtubeId}`
  );
  try {
    fs.mkdirSync(dir);
  } catch {}
};

export {
  userPlaylist,
  songsinPlaylist,
  makePlaylist,
  addSongToPlaylist,
  makeUserDir,
};
