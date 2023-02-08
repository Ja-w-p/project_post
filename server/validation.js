const Joi = require("joi");

const registerValidation = (data) => {
  const schema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().min(6).max(50).required().email(),
    ID: Joi.string().min(2).max(50).required(),
    password: Joi.string().min(8).max(1024).required(),
  });
  return schema.validate(data);
};

const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).max(50).required().email(),
    password: Joi.string().min(8).max(1024).required(),
  });
  return schema.validate(data);
};

const postValidation = (data) => {
  const schema = Joi.object({
    title: Joi.string().max(20).required(),
    category: Joi.string(),
    content: Joi.string(),
  });
  return schema.validate(data);
};

const replyValidation = (data) => {
  const schema = Joi.object({
    view: Joi.string().required().valid("讚", "噓", "無"),
    comment: Joi.string().min(1).max(20).required(),
  });
  return schema.validate(data);
};

const changeEmailValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).max(50).required().email(),
  });
  return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.postValidation = postValidation;
module.exports.replyValidation = replyValidation;
module.exports.changeEmailValidation = changeEmailValidation;
