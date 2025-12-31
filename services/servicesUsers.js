const {boom} = require('@hapi/boom');
const getConnection = require('../libs/postgres');
const { models } = require('../libs/sequelize');

// const getAllUsers = async (req, res) => {
//     const client = await getConnection();
//     const response = await client.query('SELECT * FROM tasks');
//     return response.rows;
// }   

const getAllUsers = async (req, res) => {
    const response = await models.User.findAll({
        include: ['client']
    });
    return response;
}

const findOne = async(id) => {
    try{
        const user= await models.User.findByPk(id);
        if(!user){
            throw boom.notFound('User not found');   
        }
        return user
    }
    catch(error){
        console.log(error);
    }
}

const createUser = async(body) => {
    try{
        const newUser = await models.User.create(body);
        return {
            user: newUser,
            message: 'User created'
        }
    }
    catch(error){
        console.log(error);
    }
}

const updateUser = async({id, body}) => {
    try{
        const user = await models.User.findByPk(id);
        if(!user){
            return {
                error: 'Id no encontrado'
            }            
        }
        const response = await user.update(body);
        return response;
    }   
    catch(error){
        console.log(error);
    }
}

const deleteUser = async(id) => {
    try{
        console.log('-----');
        console.log(id);
        console.log(id.id);
        const user= await models.User.findOne({ where: { id: id.id } });
        console.log('found');
        console.log(user);
        await user.destroy();
        return {
            message: 'User deleted',
            id
        }
    }
    catch(error){
        console.log(error);
    }
}

module.exports = {
    getAllUsers,
    createUser,
    updateUser,
    deleteUser,
    findOne
}