const mongoose = require('mongoose');

//To Create a schema 
const contactSchema = new mongoose.Schema({

    name:{
        type: String ,
        required: true
    },
    phone:{
        type: String ,
        required:true
    }
});

const Contact = mongoose.model('Contact' , contactSchema);

//Export
module.exports = Contact;