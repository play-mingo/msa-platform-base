import * as path from "path";
import * as fs from "fs";
import { v4 as uuidv4 } from "uuid";
import multer from "multer";
import { MulterOptions } from "@nestjs/platform-express/multer/interfaces/multer-options.interface";

export const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (fs.existsSync("upload")) fs.mkdirSync("upload", { recursive: true });
    cb(null, "upload");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const fileName = `${uuidv4().split("-").join("")}${ext}`;
    cb(null, fileName);
  },
});

export const uploadOption: MulterOptions = {
  dest: "./upload",
  storage: storage,
};
