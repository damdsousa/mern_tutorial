const User = require('../models/User');
const bcrypt = require('bcrypt')
module.exports = {
    async createUser(req, res){
        try {
            const {firstName, lastName, password, email} = req.body;

            const existentUser = await User.findOne({email});

            if(!existentUser){
                const hashedPassword = await bcrypt.hash(password, 10);
                const user = await User.create({
                    firstName, // firstName: firstName pode ser substituido por firstName por terem o mesmo nome
                    lastName,
                    email,
                    password: hashedPassword,
                });
                return res.json({
                    _id:user._id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName
                })
            }
            
            return res.status(400).json({
                message: 'Email already exist. Do you want to login instead?'
            })
            
        } catch (error) {
            throw Error(`Error while registering a new user : ${error}`);
        }
    },

    async getAllUsers(req, res){      
        try {
            const users = await User.find({}) //devolve todos os users na DB
            if(users){
                return res.json(users);
            }
        } catch (error) {
            return res.status(400).json({message: 'There are no users created.'})
        }
        
    },

    async getUserById(req, res){
        const {userId} = req.params;

        try {
            const user = await User.findById(userId);
            return res.json(user);
        } catch (error) {
            return res.status(400).json({
                message: 'User does not exists. Do you want to register?'
            })
        }
    }
}