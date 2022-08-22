const Registration = require('../models/Registration')
const Event = require('../models/Event');
const User = require('../models/User')

module.exports = {
    async create(req,res) {
        const {user_id} = req.headers;
        const {eventId} = req.params;
        const {date} = req.body;

        const registration = await Registration.create({
            user: user_id,
            event: eventId,
            date
        })

        await registration.populate([{path:'event'}, {path:'user', select:"-password"}]); 
        // popular registration com o user e o event

        return res.json(registration)
    },

    async getRegistrationById(req, res){
        const {registration_id} = req.params;
        try {
            const registration = await Registration.findById(registration_id);
            await registration.populate([{path:'event'}, {path:'user', select:"-password"}]); 
            return res.json(registration);
        } catch (error) {
            return res.status(400).json({message:"Registration not found"})
        }
    }
}