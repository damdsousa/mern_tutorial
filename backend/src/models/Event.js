const mongoose = require('mongoose'); 

const EventSchema = new mongoose.Schema( {
    title: String,
    description: String,
    price: Number,
    thumbnail: String,
    sport: String,
    date: Date,
    user: {
        type:mongoose.Schema.Types.ObjectId,
        ref: "User"
    } // evento criado por utilizador que existe na DB
}, {
    toJSON:{
        virtuals: true //ver documentacao mongoDB
    }
});

EventSchema.virtual("thumbnail_url").get(function() {return `http://localhost:8000/files/${this.thumbnail}` } ); //retorna uma proprieda com o link para ser usado no FE
module.exports = mongoose.model('Event', EventSchema);