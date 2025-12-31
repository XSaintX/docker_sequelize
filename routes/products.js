
const express = require('express');
const productServices = require('../services/servicesProducts');
const validatorHendler = require('../middleware/validator.hendler');
//const { getProductSchema } = require('../schema/schemaProduct');
const router = express.Router();

const {
  schemaProductCreate,
  updateSchemaProduct,
  getProductSchema,
} = require('../schema/schemaProduct');

router.get('/', async (req, res, next) => {
    try {
    const products = await productServices.getAllProducts();
    res.json(products);
    } catch (error) {
        next(error);
    }
});

router.get('/:id', validatorHendler(getProductSchema, 'params') , async (req, res) => {
    try {
      const { id } = req.params;
      const productOne = await productServices.getProductById(id);
      return res.send(productOne);
    } catch (error) {
        next(error);
    }
});

router.post('/', 
  validatorHendler(schemaProductCreate, 'body'), 
  async (req, res, next) => {
    try {
      const body = req.body;
      const itemcreated= await productServices.createnewProduct(body);
      return itemcreated;
    } catch (error) {
      next(error)
    }
}); 

router.patch('/:id', 
  validatorHendler(getProductSchema, 'params'), 
  validatorHendler(updateSchemaProduct, 'body'), 
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const updateProduct = await productServices.updateProduct(id, body);
      return res.json(updateProduct);
    } catch (error) {
      next(error)
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const deletedItem = await productServices.deleteProduct(id);   
      return res.json(deletedItem);
    } catch (error) {
      next(error)
    }
});



module.exports = router;