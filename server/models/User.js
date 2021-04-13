const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const moment = require('moment');

const userSchema = mongoose.Schema({
    user: {
        type: String
    },
    password: {
        type: String
    },
    name: {
        type: String
    },
    secondName: {
        type: String
    },
    city: {
        type: String
    }
})

const Usuario = mongoose.model('Usuario', userSchema);

module.exports = { Usuario }