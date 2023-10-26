import axios from "axios";
import { options, dataFolder } from "../../config/constants";
import fs from 'fs';
import path from 'path';

const serVerFetch = async (id: string) => {
  try {
    const response = await axios.request(options(id));
    return { success: true, link: response.data.link ,title: response.data.title, duration: response.data.duration };
  } catch (error) {
    console.log(error);
    return { success: false };
  }
};
const frontEndMusic = async (id: string) => {};
const downloadMusic = async(id: string)=> {
  const infor = await serVerFetch(id)
  console.log(infor.link)
  if(infor.success && infor.link) {
    const response = await axios.get(infor.link, { responseType: 'arraybuffer' })
    fs.mkdirSync(`${dataFolder}/${id}`);
    const fileBuffer = new Uint8Array(response.data);
    fs.writeFileSync(`${dataFolder}/${id}/${infor.title}.mp3`, fileBuffer);
    return infor
    
  }
}

export { serVerFetch, frontEndMusic ,downloadMusic};
