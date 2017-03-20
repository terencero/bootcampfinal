// hook mongoose into the model 
import * as mongoose from 'mongoose';

// save the mongoose.Schema class/constructor object as Schema
const Schema = mongoose.Schema;
// instantiate Employer object with the structure of data and its rules
const SuggestionSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    company: {
        type: String,
        trim: true,
        required: true
    },
    description: {
        type: String,
        trim: true,
        required: true
    } 
});

// create the 'Employer' model with our Schema class/constructor
module.exports = mongoose.model("Suggestion", SuggestionSchema);