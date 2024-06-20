import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import * as path from 'path';
import * as fs from 'fs';
import {v4 as uuidv4} from 'uuid';

export enum FileType {
    AUDIO = 'audio',
    IMAGE = 'image'
}

@Injectable()
export class FileService {
    createFile(type: FileType, file: Express.Multer.File): string {
        try {
            const fileExtension = file.originalname.split('.').pop();
            const fileName = `${uuidv4()}.${fileExtension}`;
            const filePath = path.resolve(__dirname, '..', '..', 'uploads', type); // Змінив шлях

            if (!fs.existsSync(filePath)) {
                fs.mkdirSync(filePath, { recursive: true });
            }

            fs.writeFileSync(path.resolve(filePath, fileName), file.buffer);
            return `uploads/${type}/${fileName}`;
        } catch (e) {
            throw new Error('An error occurred while writing the file');
        }
    }

    removeFile(filePath: string) {
        try {
            const fullFilePath = path.resolve(__dirname, '..', '..', filePath);
            if (fs.existsSync(fullFilePath)) {
                fs.unlinkSync(fullFilePath);
            } else {
                throw new Error('File not found');
            }
        } catch (e) {
            throw new Error(`An error occurred while deleting the file: ${e.message}`);
        }
    }

}