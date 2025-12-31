const express = require('express');
const servicesCategory = require('../services/servicesCategory')
const router = express.Router()
const {getCategory, createCategory, updateCategory } = require('../schema/schemaCategory')
const validatorHendler = require('../middleware/validator.hendler')

router.get('/', async (req, res, next)=> {
 try {
    const categories = await servicesCategory.allCategory()
    return res.send(categories)
 } catch (error) {
    next(error)
 }
})


router.get('/:id', validatorHendler(getCategory, 'params'), async (req, res, next)=> {
 try {
    const {id} = req.params
    const category = await servicesCategory.oneCategory(id)
    return res.send(category)
 } catch (error) {
    next(error)
 }
})


router.post('/', validatorHendler(createCategory, 'body'), async (req, res, next)=> {
 try {
    const body = req.body
    const newCategory = await servicesCategory.createCategory(body)
    return res.send(newCategory)
 } catch (error) {
    next(error)
 }
})


router.patch('/:id', 
    validatorHendler(getCategory, 'params'), 
    validatorHendler(updateCategory, 'body'), 

async (req, res, next)=> {
 try {
    const {id} = req.params
    const body = req.body
    const updateCategories = await servicesCategory.updateCategory(id, body)
    return res.send(updateCategories)
 } catch (error) {
    next(error)
 }
})


router.delete('/:id', 

async (req, res, next)=> {
 try {
    const {id} = req.params
    const deleteCategory = await servicesCategory.deleteCategory(id, body)
    return res.send(deleteCategory)
 } catch (error) {
    next(error)
 }
})

module.exports = router;