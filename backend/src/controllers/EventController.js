const Event = require('../models/Event');
const User = require('../models/User')

module.exports = {
    async createEvent(req, res){
        const {title, description, price, sport} = req.body;
        console.log(req.headers);
        const {user_id} = req.headers; // quando logado o id do user faz parte da session, vamos buscar aos headers
        const {filename} = req.file;

        const user = await User.findById(user_id)

        if(!user){
            return res.status(400).json({message: 'User does not exist.'})
        }

        const event = await Event.create({
            title,
            description,
            sport,
            price:parseFloat(price),
            user: user_id,
            thumbnail: filename
        })

        return res.json(event);
    },

    async deleteEvent(req, res){
        const {eventId} = req.params;
        try {
            const event = await Event.findByIdAndDelete(eventId);
            return res.status(204); // 204 foi cumprido o requisito
        } catch (error) {
            return res.status(400).json({message: 'There are no events created with that id.'});
        }
    }
}