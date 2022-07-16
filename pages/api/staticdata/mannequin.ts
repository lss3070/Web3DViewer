import path from "path";
import { promises as fs } from "fs";

export default async function handler(req, res) {
    const {model}=req.query;
    const  directory = path.join(process.cwd(), 'example/mannequin/');
    const fileContents= await fs.readFile(directory+'Samba Dancing.fbx',);
    const fileName='Samba Dancing.fbx';

    res.setHeader('content-type','application/x-tgif')
    res.setHeader('Content-Disposition', `attachment; filename=${fileName!}`);
    //Return the content of the data file in json format
    res.status(200).send(fileContents!);
}