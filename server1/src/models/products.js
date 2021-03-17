const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    available_quantity: {
        type: String
    },
    images: {
        type: Array,
        default: []
    },
    price: {
        type: String,
    },
    description: {
        type: String,
    },
    categories: {
        type: String,
    },
}, { timestamps: true })


const Product = mongoose.model('Product', productSchema);

module.exports = { Product }