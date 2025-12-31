const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3).max(30);
const lastName = Joi.string();
const phone =  Joi.string();
const userId = Joi.number().integer()
const email  = Joi.string().email()
const password = Joi.string()

const getClientSchema = Joi.object({
  id: id.required(),
});

const createClientSchema = Joi.object({
  name: name.required(),
  lastName: lastName.required(),
  phone: phone.required(),
  //userId: userId.required(),
  user: Joi.object({
    email:email.required(),
    password:password.required()
  })
});

const updateClientSchema = Joi.object({
  name,
  lastName,
  phone,
  userId
});

module.exports = { getClientSchema, createClientSchema, updateClientSchema };