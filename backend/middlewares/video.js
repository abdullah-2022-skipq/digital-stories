import multer from 'multer';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'storage');
  },

  // using original name to keep file extension
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({
  storage,
  limits: {
    fieldSize: '25mb',
  },
});

export default upload;
