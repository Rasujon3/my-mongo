const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/my-students', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB Successfully"))
    .catch(err => console.log("Connection Failed"));

// Schema => Defines the shape of documents
const studentSchema = new mongoose.Schema({
    firstName: { type: String }, // treat korche firstname er type hisebe
    lastName: { type: String, required: [true, "Please insert lastname"] },
    dob: {
        type: Date, validate: {
            validator: (value) => value > new Date("1 January 2000"),
            message: "Date must be after 1 january 2000"
        }
    },
    entryDate: { type: Date, default: Date.now },
    passed: Boolean,
    hobbies: {
        type: Array,
        of: String,
        validate: {
            validator: (value) => value.length > 0,
            message: "There must be at least 1 hobby"
        }
    },
    parents: { // treat korche parents er object hisebe,jar ekta father property r mother property thakbe...
        father: String,
        mother: String,
    },
    subjects: [{ name: String, marks: { type: Number, min: 0, max: 100 } }],

});

// Model / table
const Student = mongoose.model('Student', studentSchema); // Class
// C=> Create
async function createStudent() {
    try {
        const data = await Student.create({
            firstName: "Ruhul Amin", // treat korche firstname er type hisebe
            // lastName: "",
            dob: new Date("27 April 2001"),
            passed: true,
            hobbies: [],
            parents: { // treat korche parents er object hisebe,jar ekta father property r mother property thakbe...
                father: "A",
                mother: "B",
            },
            subjects: [{ name: "Math", marks: 80 }, { name: "English", marks: 90 }],
        });
        console.log(data);

    } catch (err) {
        console.log(err.message);
    }
}
createStudent();

// createStudent();

// R=> Read
// async function readStudents() {
//     const studentData = await Student
//         .find()
//         .select({ firstName: 1, lastName: 1, passed: 1 })
//     console.log(studentData);
// }

// // readStudents();

// async function updateStudent(id) {
//     const student = await Student.updateOne({ _id: id }, {
//         $set: { passed: false }
//     });
//     console.log(student);
// }

// // updateStudent('619d10c6c5306c02da173258');

// async function deleteStudent(id) {
//     const student = await Student.deleteOne({ _id: id });
//     console.log(student);
// }

// // deleteStudent('619d0ea29f55a4b7f3688cdb');