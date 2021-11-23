const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/my-students', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB Successfully"))
    .catch(err => console.log("Connection Failed"));

// Schema => Defines the shape of documents
const studentSchema = new mongoose.Schema({
    firstName: { type: String }, // treat korche firstname er type hisebe
    lastName: String,
    dob: Date,
    entryDate: { type: Date, default: Date.now },
    passed: Boolean,
    hobbies: [String],
    parents: { // treat korche parents er object hisebe,jar ekta father property r mother property thakbe...
        father: String,
        mother: String,
    },
    subjects: [{ name: String, marks: { type: Number, min: 0, max: 100 } }]

})