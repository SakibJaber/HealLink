import { BadRequestException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import * as fs from 'fs';
import * as path from 'path';

export const uploadFile = async (
  file: Express.Multer.File,
): Promise<string> => {
  if (!file) {
    throw new BadRequestException('File upload failed.');
  }

  // Define the uploads directory
  // const uploadsDir = path.join(__dirname, '..', '..', 'uploads');
  const uploadsDir = path.join(process.cwd(), 'uploads');

  // Create the directory if it doesn't exist
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  // Generate a unique file name
  const fileName = `${uuid()}_${file.originalname}`;
  const filePath = path.join(uploadsDir, fileName);

  try {
    // Write the file buffer to the filesystem
    fs.writeFileSync(filePath, file.buffer);
    return `/uploads/${fileName}`;
  } catch (error) {
    throw new BadRequestException('Error saving file.');
  }
};
