import Joi from 'joi'

const createTradeSchema = Joi.object({
    entryTime: Joi.date().required().messages({
        "date.base": "Entry time must be a valid date.",
        "any.required": "Entry time is required."
    }),
    exitTime: Joi.date().greater(Joi.ref('entryTime')).required().messages({
        "date.base": "Exit time must be a valid date.",
        "date.greater": "Exit time must be after entry time.",
        "any.required": "Exit time is required."
    }),
    entryPrice: Joi.number().positive().required().messages({
        "number.base": "Entry price must be a number.",
        "number.positive": "Entry price must be a positive value.",
        "any.required": "Entry price is required."
    }),
    exitPrice: Joi.number().positive().required().messages({
        "number.base": "Exit price must be a number.",
        "number.positive": "Exit price must be a positive value.",
        "any.required": "Exit price is required."
    }),
    tradeType: Joi.string().valid('buy', 'sell').required().messages({
        "any.only": "tradeType can only be 'buy' or 'sell'!",
        "any.required": "Buy field is required."
    }),
    emotions: Joi.string().allow("").optional().messages({
        "string.base": "Emotions must be a text string."
    }),
    psychology: Joi.string().allow("").optional().messages({
        "string.base": "Psychology notes must be a text string."
    }),
    learnings: Joi.string().required().messages({
        "string.base": "Learnings must be a text string.",
        "any.required": "Learnings field is required."
    })

})

const createTradeValidation = async (req, res, next) => {
    const {error} = createTradeSchema.validate(req.body);

    if(error) {
        return res.status(400).json({
            success:false,
            message: "Error creating Trade!",
            error: error.details.map(err => err.message)
        })
    }
    
    next();
};

export default createTradeValidation