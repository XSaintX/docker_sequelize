const faker = require("faker");
const boom = require("@hapi/boom");
const pooltest = require("../libs/postgres");
const sequelize = require("../libs/sequelize");

const { models } = require("../libs/sequelize");

const getAllProducts = async () => {
  try {
    //const query = 'SELECT * FROM tasks';
    //const response = await pooltest.query(query);
    //const [data] = await sequelize.query(query);
    const data = await models.Product.findAll({
        include: ['category']
    });
    //return response.rows;
    return {
      data
    };
  } catch (error) {
    console.log(error);
  }
};

const createnewProduct = async (body) => {
  try {
    console.log(body);
    const newCategory = await models.Product.create(body);
    return newCategory;
  } catch (error) {
    console.log(error);
  }
};

const updateProduct = async (id, body) => {
  try {
    const category = await models.Product.findByPk(id);
    if (!category) {
      return {
        error: "category not found",
      };
    }
    const response = await category.update(body);
    return response;
  } catch (error) {
    console.log(error);
  }
};

const deleteProduct = async (id) => {
  try {
    const category = await models.Product.findOne(id);
    await category.destroy();
    return {
      message: "category delete",
      id,
    };
  } catch (error) {
    console.log(error);
  }
};

const getOneProduct = async (id) => {   
    try {
        const product = await models.Product.findOne(id);
        if (!product) {
            return {
                error: "product not found",
            }
        }
        return product;
    } catch (error) {
        console.log(error);
    }
};


module.exports = {
  getAllProducts,
  createnewProduct,
  updateProduct,
  deleteProduct,
  getOneProduct
};
