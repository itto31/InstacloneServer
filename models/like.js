const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LikeSchema = new Schema({
    idPublication:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"Publication",
    },
    idUser:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"User",
    }
});


module.exports = mongoose.model('Like', LikeSchema);