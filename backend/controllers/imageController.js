import cloudinary from "../config/cloudinaryConfig.js"
import Image from '../models/Image.js'
import { uploadTradeImage } from '../middlewares/multerUpload.js'

const uploadImage = async (req, res) => {
    console.log("🔹 uploadImage endpoint hit");
    try {
        if(!req.file) {
            console.log("🔴 No image uploaded!");
            return res.status(400).json({
                success: false,
                message: "No image uploaded!"
            })
        }

        console.log("🔹 Uploading image to Cloudinary...");
        // Upload image to Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: "trading-journal-images"
        });

        console.log("🔹 Saving image info to DB for user:", req.user.id);
        // Save image info to DB with user reference
        const imageDoc = new Image({
            public_id: result.public_id,
            url: result.secure_url,
            user: req.user.id // assuming req.user is set by auth middleware
        });
        await imageDoc.save();

        console.log("✅ Image uploaded and saved successfully!");
        return res.status(201).json({
            success: true,
            message: "Image uploaded successfully!",
            secure_url: result.secure_url,
            public_id: result.public_id,
        })
    } catch (error) {
        console.log("🔴 Image upload failed! Error:", error.message);
        return res.status(500).json({
            message: "Image upload failed!",
            error: error.message
        })
    }
}

const deleteImage = async (req, res) => {
    console.log("🔹 deleteImage endpoint hit");
    try {
        const { publicId } = req.body;
    
        if (!publicId) {
            console.log("🔴 No image specified for deletion!");
            return res.status(400).json({
                success: false,
                message: "No image specified for deletion!"
            });
        }

        console.log("🔹 Checking image ownership in DB...");
        // Find image in DB and check ownership
        const imageDoc = await Image.findOne({ public_id: publicId });
        if (!imageDoc) {    
            console.log("🔴 Image not found in DB!");
            return res.status(404).json({
                success: false,
                message: "Image not found!"
            });
        }
        if (imageDoc.user.toString() !== req.user.id) {
            console.log("🔴 Not authorized to delete this image! User:", req.user.id);
            return res.status(403).json({
                success: false,
                message: "Not authorized to delete this image!"
            });
        }
    
        console.log("🔹 Deleting image from Cloudinary...");
        // Attempt to delete image from Cloudinary
        const result = await cloudinary.uploader.destroy(publicId);
    
        if (result.result !== "ok") {
            console.log("🔴 Failed to delete image from Cloudinary!");
            return res.status(500).json({
                success: false,
                message: "Failed to delete image from Cloudinary!"
            });
        }

        console.log("🔹 Removing image from DB...");
        // Remove image from DB
        await imageDoc.deleteOne();
    
        console.log("✅ Image deleted successfully!");
        return res.status(200).json({
            success: true,
            message: "Image Deleted successfully!"
        });
    } catch (error) {
        console.log("🔴 Server failed to delete image! Error:", error.message);
        return res.status(500).json({
            success: false,
            message: "Server failed to delete image!",
            error: error.message
        });
    }
}

export { uploadImage, deleteImage }