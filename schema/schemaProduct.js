const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3).max(30);
const price = Joi.number().integer().min(10);
const details = Joi.string().min(10);
const categoryId = Joi.number().integer();

const schemaProductCreate = Joi.object({
    name: name.required(),
    price: price.required(),
    description: details.required(),
    categoryId: categoryId.required()
})

const updateSchemaProduct = Joi.object({
    name: name,
    price: price,
    details: details,
    categoryId
});

const getProductSchema = Joi.object({
    id: id.required(),
})

module.exports = {
    schemaProductCreate,
    updateSchemaProduct,
    getProductSchema
}