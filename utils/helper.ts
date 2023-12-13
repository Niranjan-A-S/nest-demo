import { readFile, writeFile } from "fs/promises";

export const getFileContents = async (path: string) => {
    try {
        const data = await readFile(path, { encoding: "utf8" });
        return data;
    } catch (error) {
        console.log(error);
        return undefined;
    }
}

export const _writeFile = async (path: string, data: string) => {
    try {
        await writeFile(path, data);
        return "Added to DB"
    } catch (error) {
        console.log(error);
        return undefined;
    }
}