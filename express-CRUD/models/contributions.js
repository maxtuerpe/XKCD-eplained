const mongoose = require('mongoose');

const contrubutionsSchema = new mongoose.Schema ({
    comic: Number,
    comment: String,
    sources: [String],
})

module.exports = mongoose.model('Contribution', contrubutionsSchema);