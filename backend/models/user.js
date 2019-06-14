const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    dailyIntakes: [
        {
            type: Schema.Types.ObjectId,
            ref: 'DailyIntake'
        }
    ]
});

module.exports = mongoose.model('User', userSchema);