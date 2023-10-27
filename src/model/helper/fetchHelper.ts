import axios from "axios";
import { options, dataFolder, idToMusic } from "@/config/constants";
import fs from "fs";
import path from "path";
import NodeID3 from "node-id3";

const serVerFetch = async (id: string) => {
  try {
    const response = await axios.request(options(id));
    return {
      success: true,
      link: response.data.link,
      title: response.data.title,
      duration: response.data.duration,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      link: '',
      title: '',
      duration: '1:00',
    };
  }
};
const frontEndMusic = async (id: string) => {
  fs.readFile(idToMusic(id), (err, buffer) => {
    if (err) return err;
    return buffer;
  });
};
const downloadMusic = async (id: string) => {
  const infor = await serVerFetch(id);
  if (infor.success && infor.link) {
    const response = await axios.get(infor.link, {
      responseType: "arraybuffer",
    });
    fs.mkdirSync(`${dataFolder}/${id}`);
    const fileBuffer = new Uint8Array(response.data);
    fs.writeFileSync(`${dataFolder}/${id}/${infor.title}.mp3`, fileBuffer);
    return {
      success: true,
      data: { title: infor.title, id, duration: infor.duration },
    };
  } else
    return {
      success: false,
      message: "No video",
      data: ''
    };
};

const downloadMusicQueue = async (id: string) => {
  const infor = await serVerFetch(id);
  if (infor.success && infor.link) {
    const response = await axios.get(infor.link, {
      responseType: "arraybuffer",
    });
    fs.mkdirSync(`${dataFolder}/${id}`);
    const fileBuffer = new Uint8Array(response.data);
    fs.writeFile(
      `${dataFolder}/${id}/${infor.title}.mp3`,
      fileBuffer,
      (err) => {
        if (err) console.log(err);
      }
    );
  }
};

const musicInforFromId = (id: string) => {
  try {
    const tags = NodeID3.read(idToMusic(id));
    const { title, duration, artist } = tags as any;
    return { success: true, data: { title, duration, artist, id } };
  } catch {
    return { success: false, message: { message: "No song to read" } };
  }
};

export {
  serVerFetch,
  frontEndMusic,
  downloadMusic,
  musicInforFromId,
  downloadMusicQueue,
};
