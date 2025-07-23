import express from 'express';
import { uploadImage, deleteImage } from '../controllers/imageController.js';
import verifyJWT from '../middlewares/verifyJWT.js';
import {uploadTradeImage} from '../middlewares/multerUpload.js';

const router = express.Router();

// Upload image (protected)
router.post('/upload', verifyJWT, uploadTradeImage.single('image'), uploadImage);

// Delete image (protected)
router.delete('/delete', verifyJWT, deleteImage);

export default router;