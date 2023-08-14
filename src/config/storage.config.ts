import { MulterError, diskStorage } from 'multer';
import { join } from 'path';
import { MAX_FILE_SIZE } from 'src/common/common';

export const storageConfig = {
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/)) {
      cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
    }
    cb(null, true);
  },
  limits: { fileSize: MAX_FILE_SIZE },
  storage: diskStorage({
    destination: join(__dirname, '..', '..', 'public/images'),
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  }),
};

export const storageConfigStaff = {
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/)) {
      cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
    }
    cb(null, true);
  },
  limits: { fileSize: MAX_FILE_SIZE },
  storage: diskStorage({
    destination: join(__dirname, '..', '..', 'public/staff'),
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  }),
};

export const storageConfigFile = {
  storage: diskStorage({
    destination: join(__dirname, '..', '..', 'public/files'),
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  }),
};
