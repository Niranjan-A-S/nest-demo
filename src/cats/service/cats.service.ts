import { Injectable } from "@nestjs/common";
import { _writeFile, getFileContents } from "utils/helper";
import path from "node:path";

export const PATH = path.join(process.cwd(), 'db', 'cats.json');

@Injectable()
export class CatsService {
    async findAll() {
        const catData = await getFileContents(PATH);
        return JSON.parse(catData);
    }

    async write(data: string) {
        const existingFileContents = await getFileContents(PATH);
        const parsedFileContents = existingFileContents ? JSON.parse(existingFileContents) : [];
        const contentsToWrite = [...parsedFileContents, data];
        await _writeFile(PATH, JSON.stringify(contentsToWrite));
    }

    async findById(id) {
        id = Number(id);
        let catData = await getFileContents(PATH);
        catData = JSON.parse(catData);
        if (!catData || !catData.length || !catData[id]) return "No cat found";
        return catData[id];
    }
}
