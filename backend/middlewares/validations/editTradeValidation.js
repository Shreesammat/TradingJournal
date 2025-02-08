    import Joi from 'joi'

    const editTradeSchema = Joi.object({
        tradeId: Joi.string()
            .hex()
            .length(24)
            .required()
            .messages({
                'string.base': 'Trade ID needs to be a string',
                'string.hex': 'Trade ID must be a valid MongoDB objectID',
                'string.length': 'Trade ID must be of length 24',
                'any.required': 'Trade ID is required!'
        }),
        entryTime: Joi.date().optional(),
        
        exitTime: Joi.optional().when("entryTime", {
            is: Joi.exist(),
            then: Joi.date()
            .greater(Joi.ref('entryTime'))    
            .messages({
                'date.greater': 'Exit time must be after entry time!'
            }),
        }),
        entryPrice: Joi.number()
            .optional()
            .positive()
            .messages({
                'number.base': 'Entry price must be a number',
                'number.positive': 'Entry price must be a positie value!'
        }),
        exitPrice: Joi.number()
            .optional()
            .positive()
            .messages({
                'number.base': 'Exit price must be a number',
                'number.positive': 'Exit price must be positive!'
        }),

        buy: Joi.boolean()
            .optional()
            .messages({
                'boolean.base': 'Buy must be either true (long) or false (short).',
            }),

        emotions: Joi.string()
            .optional()
            .allow('')
            .messages({
                'string.base': 'Emotions must be a string.',
            }),

        psychology: Joi.string()
            .optional()
            .allow('')
            .messages({
                'string.base': 'Psychology must be a string.',
            }),

        learnings: Joi.string()
            .optional()
            .messages({
                'string.base': 'Learnings must be a string.',
            }),

        //disallowing some fields
        createdAt: Joi.forbidden().messages({
            'any.unknown': 'You cannot modify createdAt'
        }),
        updatedAt: Joi.forbidden().messages({
            'any.unknown': 'You cannot modify updatedAt.',
        }),

        chartScreenShots: Joi.forbidden().messages({
            'any.unknown': 'You cannot modify chartScreenShots.',
        }),

    }).min(1);

    const editTradeValidation = async (req, res, next) => {
        const { error } = editTradeSchema.validate(req.body);

        if (error) {
            return res.status(400).json({
                success: false,
                error: error.details.map(err => err.message),
                message: 'Validation failed!'
            })
        }

        next();
    };

    export default editTradeValidation