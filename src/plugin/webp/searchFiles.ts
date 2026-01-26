import { promises as fs } from "fs";
import path from "path";

type SerachFile = {
  dirName: string;
  fileName: string;
  ext: string;
};

const SEARCH_EXT_LIST = [".jpg", ".jpeg", ".png"];

export const searchFiles = async (dirPath: string): Promise<SerachFile[]> => {
  const allDirectory = await fs.readdir(dirPath, { withFileTypes: true });
  const files: SerachFile[] = [];
  for (const directory of allDirectory) {
    if (directory.isDirectory()) {
      const newDirPath = path.join(dirPath, directory.name);
      const newFiles: SerachFile[] = await searchFiles(newDirPath);
      files.push(...newFiles);
    }
    if (
      directory.isFile() &&
      SEARCH_EXT_LIST.includes(path.extname(directory.name))
    ) {
      files.push({
        dirName: path.join(dirPath),
        fileName: directory.name,
        ext: path.extname(directory.name),
      });
    }
  }
  return files;
};
