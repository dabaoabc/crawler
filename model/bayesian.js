/*
* @author junmo
 */
var mongoose = require('mongoose')

var BayesianSchema = mongoose.Schema({
    hot_word: {type: String, unique: true},
    segmentword: {type: String}
});

var bayesian = mongoose.model('newbayesians', BayesianSchema)
module.exports = bayesian;