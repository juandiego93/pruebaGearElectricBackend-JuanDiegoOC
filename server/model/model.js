const { compileQueryParser } = require('express/lib/utils');
const mongoose = require('mongoose');
var P = mongoose.Promise = require('bluebird');

//Init Types documents
var TypeDocuments = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
    }
})
const typeDocument = mongoose.model('typeDocument', TypeDocuments)

var arrayDataTypeDocuments = [
    { name: 'Cedula de Ciudadania' },
    { name: 'Tarjeta de Identidad' },
    { name: 'Cedula de extranjeria' },
]

typeDocument.countDocuments({}, (err, count) => {
    if (count == 0) {
        arrayDataTypeDocuments.forEach((value, index) => {
            new typeDocument(value).save()
        })
    }
})
//Finish Types documents

var schema = new mongoose.Schema({
    typeDocument: {
        type: mongoose.Schema.Types.ObjectId, ref: 'typeDocument',
        required: true,
    },
    document: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    status: {
        type: Boolean,
        required: true,
    },
})

const UserDb = mongoose.model('userdb', schema)

module.exports = {
    'UserDb': UserDb,
    'typeDocument': typeDocument
}