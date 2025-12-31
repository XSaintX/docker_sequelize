const { boom } = require("@hapi/boom");
// const getConnection = require('../libs/postgres')
const { models } = require("../libs/sequelize");

const allCategory = async () => {
  try {
    const categories = await models.Category.findAll();
    return categories;
  } catch (error) {
    console.log(error);
  }
};

const oneCategory = async (id) => {
  try {
    const categoryOne = await models.Category.findByPk(id, 
        {
            include: ['products']
        }
    );
    if (!categoryOne) {
      throw boom.notFound("category not found");
    }
    return categoryOne;
  } catch (error) {
    console.log(error);
  }
};

const createCategory = async (body) => {
  try {
    const categoryCreate = await models.Category.create(body);
    return categoryCreate;
  } catch (error) {
    console.log(error);
  }
};

const updateCategory = async (id, body) => {
  try {
    const categoryUpdate = await models.Category.findByPk(id);
    return categoryUpdate;
  } catch (error) {
    console.log(error);
  }
};

const deleteCategory = async (id) => {
  try {
    const categoryDelete = await models.Category.delete(id);
    return {
      categoryDelete,
      id,
    };
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  allCategory,
  oneCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
