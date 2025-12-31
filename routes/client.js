const express = require('express');
const servicesClient = require('../services/servicesClient')
const router = express.Router()
const {getClientSchema, createClientSchema,updateClientSchema } = require('../schema/schemaClient')
const validatorHendler = require('../middleware/validator.hendler')




router.get('/', async (req, res, next)=> {
 try {
  const getClient = await servicesClient.getClients(req, res)
  return res.send({getClient})
 } catch (error) {
  next(error)
 }
})

router.get('/:id', validatorHendler(getClientSchema, 'params'),
  async (req, res, next)=> {
  try {
   const {id} = req.params
   const oneClient = await servicesClient.findOne(id)
   res.json(oneClient)
  } catch (error) {
   next(error)
  }
 })





router.post('/', validatorHendler(createClientSchema, 'body'),
  async(req, res, next)=>{
  try {
    const body = req.body
    const newClient = await servicesClient.createClient(body)
    return res.send(newClient)
  } catch (error) {
    res.send(error)
    next(error)
  }
})


router.patch('/:id',
validatorHendler(getClientSchema, 'params'),
validatorHendler(updateClientSchema, 'body'),
async(req, res, next)=>{
try {
  const {id} = req.params
  const body = req.body
  const updateClient = await servicesClient.updateClients(id, body)
  return res.json(updateClient)
} catch (error) {
  next(error)
}
})



router.delete('/:id', async (req, res, next)=>{
  try {
    const {id} = req.params
    const clientDelete = await servicesClient.deleteClient({id})
    return res.json(clientDelete)
  } catch (error) {
    next(error)
  }
})

module.exports = router;