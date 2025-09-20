const Joi = require('joi');

const userSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(7).max(20).required(),
  company: Joi.string().max(100).required(),
  street: Joi.string().max(200).required(),
  city: Joi.string().max(100).required(),
  zipcode: Joi.string().max(20).required(),
  geo: Joi.object({
    lat: Joi.number().required(),
    lng: Joi.number().required()
  }).required()
});

module.exports = { userSchema };