import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinaryConfig.js';

const tradeStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'trading_journal', // Folder in Cloudinary
    format: async (req, file) => 'webp', // Convert to webp
    public_id: (req, file) => `${Date.now()}-${file.originalname.replace(/\s+/g, "_").split(".")[0]}`, // Unique filename
    transformation: [{quality: "auto"}]
  },
});

const profileStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => ({
    folder: "profile_pictures",
    format: "webp",
    public_id: `${Date.now()}-${file.originalname.replace(/\s+/g, "_").split(".")[0]}`,
    transformation: [{ width: 300, height: 300, crop: "fill", gravity: "face", quality: "auto" }],
  }),
});

const uploadTradeImage = multer({ storage: tradeStorage });
const uploadProfileImage = multer({ storage: profileStorage });

export { uploadTradeImage, uploadProfileImage }