/*
* @author junmo
 */
var mongoose = require('mongoose')

var WordSchema = mongoose.Schema({
    hot_word: {type: String, unique: true},
    segmentword: {type: Array}
});

var Word = mongoose.model('newwords', WordSchema)
module.exports = Word;