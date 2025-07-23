import Joi from "joi";

const editTradeSchema = Joi.object({
  tradeId: Joi.string().hex().length(24).required().messages({
    "string.base": "Trade ID needs to be a string",
    "string.hex": "Trade ID must be a valid MongoDB objectID",
    "string.length": "Trade ID must be of length 24",
    "any.required": "Trade ID is required!",
  }),

  index: Joi.string().optional().messages({
    "string.base": "Index must be a text string.",
  }),
  quantity: Joi.number().optional().messages({
    "number.base": "Quantity must be a number.",
  }),
  pnl: Joi.number().optional().messages({
    "number.base": "PNL must be a number.",
  }),

  entryTime: Joi.date().optional().messages({
    "date.base": "Entry time must be a valid date.",
  }),

  exitTime: Joi.optional().when("entryTime", {
    is: Joi.exist(),
    then: Joi.date().greater(Joi.ref("entryTime")).messages({
      "date.greater": "Exit time must be after entry time!",
    }),
  }),
  entryPrice: Joi.number().optional().positive().messages({
    "number.base": "Entry price must be a number",
    "number.positive": "Entry price must be a positie value!",
  }),
  exitPrice: Joi.number().optional().positive().messages({
    "number.base": "Exit price must be a number",
    "number.positive": "Exit price must be positive!",
  }),

  tradeType: Joi.string().optional().valid("Buy", "Sell").messages({
    "any.only": "tradeType can only be 'buy' or 'sell'!",
    "boolean.base": "Buy must be either true (long) or false (short).",
  }),

  emotions: Joi.array().items(Joi.string()).optional().allow("").messages({
    "array.base": "Emotions must be an array of strings.",
    "string.base": "Emotions must be a string.",
  }),

  psychology: Joi.array().items(Joi.string()).optional().allow("").messages({
    "array.base": "Learnings must be an array of strings.",
    "string.base": "Psychology must be a string.",
  }),

  learnings: Joi.array().items(Joi.string()).optional().messages({
    "array.base": "Learnings must be an array of strings.",
    "string.base": "Learnings must be a string.",
  }),

  chartScreenShot: Joi.string().optional().messages({
    "string.base": "Chart screenshot must be a text string (URL or path).",
  }),

  //disallowing some fields
  createdAt: Joi.forbidden().messages({
    "any.unknown": "You cannot modify createdAt",
  }),
  updatedAt: Joi.forbidden().messages({
    "any.unknown": "You cannot modify updatedAt.",
  }),
}).min(1);

const editTradeValidation = async (req, res, next) => {
  const { error } = editTradeSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      success: false,
      error: error.details.map((err) => err.message),
      message: "Validation failed!",
    });
  }

  next();
};

export default editTradeValidation;
