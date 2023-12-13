import { Injectable } from "@nestjs/common";
import { _writeFile, getFileContents } from "utils/helper";
import path from "node:path";

export const PATH = path.join(process.cwd(), 'db', 'cats.json');

@Injectable()
export class CatsService {
    async findAll() {
        const catData = await getFileContents(PATH);
        return catData;
    }

    async write(data: string) {
        const existingFileContents = await getFileContents(PATH);
        const parsedFileContents = existingFileContents ? JSON.parse(existingFileContents) : [];
        const contentsToWrite = [...parsedFileContents, data];
        await _writeFile(PATH, JSON.stringify(contentsToWrite));
    }
}
