import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    username: { 
        type: String, 
        required: true, 
        unique: true,
    },
    fullName: { 
        type: String,
        required: true,
    },
    password: { 
        type: String, 
        required: true,
        minLenghth: 6,
    },
    email: { 
        type: String, 
        required: true, 
        unique: true,
    },
    //type of array
    followers:[ {
        type: mongoose.Schema.Types.ObjectId, // Array of ObjectIds
        ref: 'User', // Reference to User model
        default: [], // User starts with no followers when they sign up
    }],
    following:[ {
        type: mongoose.Schema.Types.ObjectId, // Array of ObjectIds
        ref: 'User', // Reference to User model
        default: [], // User starts with no following when they sign up
    }],
    profileImg: {
        type: String,
        default: "", // Default profile picture URL or path
    },
    coverImg: {
        type: String,
        default: "", // Default cover picture URL or path
    },
    bio: {
        type: String,
        maxLength: 160, // Twitter-like bio length limit
        default: "",
    },
    link: {
        type: String,
        default: "",
    },
    LikedPosts:[ 
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post',
            default: [],
        }
    ],
},{timestamps: true});

const User = mongoose.model('User', userSchema);
export default User;