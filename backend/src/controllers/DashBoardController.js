const Event = require('../models/Event');

module.exports = {
   
    async getEventById(req, res){
        const {eventId} = req.params;
        
        try {
            const event = await Event.findById(eventId)
            if(event){
                return res.json(event);
            }
        } catch (error) {
            return res.status(400).json({message: 'Event does not exist.'})
        }
        
    },

    async getAllEvents(req, res){      
        try {
            const events = await Event.find({}) //devolve todos os eventos na DB
            if(events){
                return res.json(events);
            }
        } catch (error) {
            return res.status(400).json({message: 'There are no events created.'})
        }
        
    },

    async getEventsBySport(req, res){  
        const {sport} = req.params;  
        const query = {sport} || {} // se sport for undefined query fica um dic vazio.  
        try {
            const events = await Event.find(query) //devolve todos os eventos na DB
            if(events){
                return res.json(events);
            }
        } catch (error) {
            return res.status(400).json({message: 'There are no events created with that sport.'});
        }
    }
}