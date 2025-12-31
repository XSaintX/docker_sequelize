const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3).max(15);
const image = Joi.string().uri();

const createCategory = Joi.object({
    name: name.required(),
    image: image.required()
})

const updateCategory = Joi.object({
    name: name,
    image: image
});

const getCategory = Joi.object({
    id: id.required()
})

module.exports = {
    createCategory,
    updateCategory,
    getCategory
}