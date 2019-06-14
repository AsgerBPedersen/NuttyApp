const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const dailyIntakeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    kcal: {
        type: Number,
        required: true
    },
    protein: {
        type: Number,
        required: true
    },
    fat: {
        type: Number,
        required: true
    },
    carbs: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('DailyIntake',dailyIntakeSchema);