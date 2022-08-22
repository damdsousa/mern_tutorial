const User = require('../models/User');
const bcrypt = require('bcrypt');

module.exports = {
    async store(req, res){
        try {
            const {email, password} = req.body;
            if(!email || !password){
                return res.status(200).json({message: "Required field missing."});
            }

            const user = await User.findOne({email});
            if(!user){
                return res.status(200).json({message: "User not found. Register first."});
            }
            if(user && await bcrypt.compare(password, user.password)){ //metodo compare do bcrypt faz hash da password recebida do FE e compara com o hash presente na DB
                const userResponse = {
                    _id:user._id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName
                } //criar user nos cookies para quando esta logado
                return res.json(userResponse)
            }
            else {
                return res.status(200).json({message: "Email or Password is not a match."})
            }
        } catch (error) {
            throw Error(`Error while authenticating a User ${error}`)
        }
    }
}