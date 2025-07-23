import Joi from "joi";

const createTradeSchema = Joi.object({
  entryTime: Joi.date().required().messages({
    "date.base": "Entry time must be a valid date.",
    "any.required": "Entry time is required.",
  }),
  exitTime: Joi.date().greater(Joi.ref("entryTime")).required().messages({
    "date.base": "Exit time must be a valid date.",
    "date.greater": "Exit time must be after entry time.",
    "any.required": "Exit time is required.",
  }),
  entryPrice: Joi.number().positive().required().messages({
    "number.base": "Entry price must be a number.",
    "number.positive": "Entry price must be a positive value.",
    "any.required": "Entry price is required.",
  }),
  exitPrice: Joi.number().positive().required().messages({
    "number.base": "Exit price must be a number.",
    "number.positive": "Exit price must be a positive value.",
    "any.required": "Exit price is required.",
  }),
  tradeType: Joi.string().valid("Buy", "Sell").required().messages({
    "any.only": "tradeType can only be 'buy' or 'sell'!",
    "any.required": "Buy field is required.",
  }),
  emotions: Joi.array().items(Joi.string()).optional().messages({
    "array.base": "Emotions must be an array of strings.",
    "string.base": "Each emotion must be a text string.",
  }),
  psychology: Joi.array().items(Joi.string()).optional().messages({
    "array.base": "Psychology must be an array of strings.",
    "string.base": "Each psychology note must be a text string.",
  }),
  learnings: Joi.array().items(Joi.string()).required().messages({
    "array.base": "Learnings must be an array of strings.",
    "string.base": "Each learning must be a text string.",
    "any.required": "Learnings field is required.",
  }),
  chartImage: Joi.string().optional().messages({
    "string.base": "Chart screenshot must be a text string (URL or path).",
  }),

  index: Joi.string().required().messages({
    "string.base": "Index must be a text string.",
    "any.required": "Index field is required.",
  }),
  quantity: Joi.number().required().messages({
    "number.base": "Quantity must be a number.",
    "any.required": "Quantity field is required.",
  }),
  pnl: Joi.number().optional().messages({
    "number.base": "PNL must be a number.",
    "any.required": "pnl field is required.",
  }),
});

const createTradeValidation = async (req, res, next) => {
  console.log("🔹 Validating trade creation request body:", req.body);

  const { error } = createTradeSchema.validate(req.body);

  if (error) {
    console.log(
      "🔴 Trade validation failed:",
      error.details.map((err) => err.message)
    );
    return res.status(400).json({
      success: false,
      message: "Error creating Trade!",
      error: error.details.map((err) => err.message),
    });
  }
  console.log("✅ Trade validation passed.");
  next();
};

export default createTradeValidation;
