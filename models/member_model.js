const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
    name: {type: String, required: true},
    occupation: {type: String},
    age: {type: Number},
    isOnline: {type: Boolean, default: false},
    timestamp: {type: Date, default: Date.now}
}, {
    collection: 'members',
})

const model = mongoose.model('Member', memberSchema);
module.exports = model

// module.exports = mongoose.model('Member', memberSchema);