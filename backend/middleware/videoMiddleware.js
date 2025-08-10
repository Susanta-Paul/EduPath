import multer from "multer"


const storage = multer.memoryStorage()

const fileFilter = (req, file, cb) => {
  // Allowed video MIME types
  const allowedMimeTypes = [
    "video/mp4",
    "video/mpeg",
    "video/ogg",
    "video/webm",
    "video/quicktime", // for .mov files
    "video/x-msvideo"  // for .avi files
  ];

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true); // Accept the file
  } else {
    cb(new Error("Only video files are allowed"), false); // Reject the file
  }
};

export const uploadMiddleware = multer({ 
    storage: storage ,
    fileFilter,
    limits:{
        fileSize: 100 * 1024 * 1024 // 100MB max size
    }
})