import Joi from 'joi';

const userValidationSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    isManager: Joi.bool().strict().required()
});

export default userValidationSchema;
