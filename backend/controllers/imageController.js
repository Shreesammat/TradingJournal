import cloudinary from "../config/cloudinaryConfig.js"

const uploadImage = async (req, res) => {
    try {
        if(!req.file) {
            return res.status(400).json({
                success: false,
                message: "No image uploaded!"
            })
        }

        return res.status(201).json({
            success: true,
            message: "Image uploaded successfully!",
            image: req.file.path,
            public_id: req.file.filename,
        })
    } catch (error) {
        return res.status(500).json({
            message: "Image upload failed!",
            error: error.message
        })
    }
}

const deleteImage = async (req, res) => {
    try {
        const { publicId } = req.body;
    
        if (!publicId) {
            return res.status(400).json({
                success: false,
                message: "No image specified for deletion!"
            });
        }
    
        // Attempt to delete image from Cloudinary
        const result = await cloudinary.uploader.destroy(publicId);
    
        if (result.result !== "ok") {
            return res.status(500).json({
                success: false,
                message: "Failed to delete image from Cloudinary!"
            });
        }
    
        return res.status(200).json({
            success: true,
            message: "Image Deleted successfully!"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server failed to delete image!"
        });
    }
}

export { uploadImage, deleteImage }