const mongoose = require("mongoose");

const UserSchame = mongoose.Schema({
    first_name: {
        type: String,
        required: [true, 'first name is required'],
        trim: true,
    },
    last_name: {
        type: String,
        required: [true, 'last Name is Required'],
        trim: true,
    },
    email: {
        type: String,
        unique: [true, 'username must be unique.'],
        trim: true,
        required: [true, 'email id is required']
    },
    password: {
        type: String,
        required: [true, 'password field is required ']
    }, passwordChangedAt: {
        type: Date,
        default: Date.now()
    },
    picture: {
        type: String,
        default: "hide-facebook-profile-picture-notification.jpg"
    },
    cover: {
        type: String,
        default: "https://colorfully.eu/wp-content/uploads/2012/06/smile-facebook-cover.jpg"
    },
    gender: {
        type: String,
        required: [true, 'gender is required'],
        enum: ['male', 'female']
    },
    byear: {
        type: String,
        required: [true, 'byear is required']
    },
    bmonth: {
        type: String,
        required: [true, 'bmonth is required']
    },
    bday: {
        type: String,
        required: [true, 'bday is required']
    },
    friends: {
        type: Array,
        default: []
    },
    following: {
        type: Array,
        default: []
    },
    followers: {
        type: Array,
        default: []
    },
    requests: {
        type: Array,
        default: []
    },
    search: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'User'
        }
    ],
    details: {
        bio: {
            type: String,
            default: '',
            trim: [true]
        },
        job: {
            type: String,
            default: '',
            trim: [true]
        },
        workplace: {
            type: String,
            default: '',
            trim: [true]
        },
        highSchool: {
            type: String,
            default: '',
            trim: [true]
        },
        college: {
            type: String,
            default: '',
            trim: [true]
        },
        currentCity: {
            type: String,
            default: '',
            trim: [true]
        },
        highSchool: {
            type: String,
            default: '',
            trim: [true]
        },
        relationship: {
            type: String,
            enum: ['single', 'coupled']
        },
        instagram: {
            type: String,
            default: '',
        },
    },
    saveposts: [
        {
            post: {
                type: mongoose.Schema.ObjectId,
                ref: 'Post'
            },
            saveAt: {
                type: Date,
                default: new Date()
            }
        }
    ]
}, { timestamps: true })
const User = mongoose.model("User", UserSchame);
module.exports = User;