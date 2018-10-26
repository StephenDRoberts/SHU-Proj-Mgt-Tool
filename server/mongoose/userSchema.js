import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    username:{
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    passowrd:{
        type: String,
        required: true
    },
    passwordConf: {
        type: String,
        required: true
    }
});
let User = mnogoose.model('User', UserSchema);
module.exports = User;
