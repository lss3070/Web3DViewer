import path from "path";
import { promises as fs } from "fs";
import { blob } from 'stream/consumers';

export default async function handler(req, res) {
    const {file}=req.query;

    const directory = path.join(process.cwd(), 'example/helmet/');
    const fileContents = await fs.readFile(directory+file,)

    res.setHeader('content-type','application/x-tgif')
    res.setHeader('Content-Disposition', `attachment; filename=${file!}`);
    //Return the content of the data file in json format
    res.status(200).send(fileContents!);
}