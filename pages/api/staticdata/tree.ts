import path from "path";
import { promises as fs } from "fs";

export default async function handler(req, res) {
    const {model}=req.query;
    const  directory = path.join(process.cwd(), 'example/tree/');
    const fileContents= await fs.readFile(directory+'tree.obj',);
    const fileName='tree.obj';

    res.setHeader('content-type','application/x-tgif')
    res.setHeader('Content-Disposition', `attachment; filename=${fileName!}`);
    //Return the content of the data file in json format
    res.status(200).send(fileContents!);
}