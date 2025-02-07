import Joi from 'joi'

const editTradeSchema = Joi.object({
    tradeId: Joi.string()
})

const editTradeValidation = async (req, res, next) => {
    next()
};

export default editTradeValidation