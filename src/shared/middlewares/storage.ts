import multer from "multer";
const storage = multer.diskStorage({
  destination: (_req, _res, cb) => {
    cb(null, "src/uploads/");
  },
  filename: (_req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

export default upload;
