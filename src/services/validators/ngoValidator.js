import Joi from 'joi';

const ngoValidationSchema = Joi.object({
    name: Joi.string().required(),
    code: Joi.string().required(),
    phoneNumber: Joi.string().required(),
    interests: Joi.array().required()
});

export default ngoValidationSchema;
