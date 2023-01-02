const mongoose = require('mongoose');
const schema1 = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    message: {
        type: String,
        required: true,
    }
});


const schema2 = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cpassword: {
        type: String,
        required: true
    }
})

//create a collections
const collection1 = new mongoose.model("userContactData", schema1);
const collection2 = new mongoose.model("userSingupData", schema2);
module.exports = {
    collection1: collection1,
    collection2: collection2
};