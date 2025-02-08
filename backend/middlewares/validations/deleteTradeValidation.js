import Joi from 'joi'

const deleteTradeSchema = await Joi.object({
    tradeId: Joi.string()
        .hex()
        .length(24)
        .required()
        .messages({
            'string.base': 'Trade ID must be a string!',
            'string.length': 'Trade ID must be of length 24',
            'any.required': 'Trade ID is required',
            'string.hex': 'Trade ID must be a valid MongoDB ObjectID'
        })
})

const deleteTradeValidation = async (req, res, next) => {
    const {error} = await deleteTradeSchema.validate(req.body);

    if (error) {
        return res.status(400).json({
            success: false,
            error: error.details.map(err => err.message),
            message: 'Failed deleting the trade!'
        })
    }

    next();
}

export default deleteTradeValidation