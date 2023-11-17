import Joi from 'joi';

const phoneNumberRegex = /^[1-9]{1}[1-9]{1}9[1-9][0-9]{7}$/;

const ngoValidationSchema = Joi.object({
    name: Joi.string().required(),
    code: Joi.string().required(),
    phoneNumber: Joi.string().pattern(phoneNumberRegex).required(),
    interests: Joi.array().required()
});

export default ngoValidationSchema;
