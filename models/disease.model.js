var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DiseaseSchema = new Schema({
    title: String,
    syndromes: [
        { syndrome: String }
    ],
    treatments:[
        { treatment: String }
    ]
});

module.exports = mongoose.model('Disease', DiseaseSchema, 'diseases');