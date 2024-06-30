const mongoose=require('mongoose');


const urlSchema= new mongoose.Schema({
    shortId: {
        type: String,
        required: true,
        unique: true 
    },redirectUrl: {
        type: String,
        required: true
    },
    visithistory:[{timestamp: {type: Number}}],
    createdby: {
type: mongoose.Schema.Types.ObjectId,
ref: "users"
    }

},{timestamps: true});


const URL=mongoose.model("urls",urlSchema);


module.exports= URL;