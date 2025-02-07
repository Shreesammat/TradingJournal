import Joi from 'joi'

const updateProfileSchema = Joi.object({
    newName: Joi.string().trim().min(3).max(50).pattern(/^[A-Za-zÀ-ÿ\s'-]+$/).required().messages({
        "string.base": "Name must be a string",
        "string.min": "Name must be atleast 3 characters long",
        "string.max": "Name must not exceed 50 characters",
        "string.pattern.base": "Name can only contain Letters, Spaces, - hyphens, and 'apostophes",
        "any.required": "Name is required"
    }),
});

const nameValidation = async (req, res, next) => {
    const { error } = updateProfileSchema.validate(req.body);

    if(error) {
        return res.status(400).json({
            message: "Validation error!",
            errors: error.details.map(err => err.message)
        });
    }

    next();
};

export default nameValidation