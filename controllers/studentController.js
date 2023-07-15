const asyncHandler = require("express-async-handler");
const Student = require("../models/StudentModel");
const mongoose = require("mongoose");
//@desc : Get all students
//@route : GET /api/students

const getStudents = asyncHandler(async (req, res) => {
    console.log("herreee")
    const students = await Student.find();
    res.status(200).json(students);
});

//@desc : Create a student
//@route : POST /api/students

const createStudent = asyncHandler(async (req, res) => {
    console.log(req.body);
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
        res.status(400);
        throw new Error("All fields are required!")
    }
    const student = await Student.create({
        name, email, phone
    })

    res.status(201).json({ message: "Student created", value: student });
});

//@desc : Get a student
//@route : GET /api/students/:id

const getStudent = asyncHandler(async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        res.status(404);
        throw new Error("Student not found");
    }
    const student = await Student.findOne({ _id: req.params.id });
    console.log(student);
    if (!student || student == null) {
        console.log("here kitty");
        res.status(404);
        throw new Error("Student not found");
    }
    res.status(200).json(student);
});


//@desc : Update a student
//@route : PUT /api/students/:id
//here


const updateStudent = asyncHandler(async (req, res) => {
    const { name, email, phone } = req.body;
    if (!mongoose.isValidObjectId(req.params.id)) {
        res.status(404);
        throw new Error("Student not found");
    }
    if (!name && !email && !phone) {
        res.status(400);
        throw new Error("All fields are required!")
    }
    const student = await Student.findOne({ _id: req.params.id });
    if (!student || student == null) {
        res.status(404);
        throw new Error("Student not found");
    }
    const updatedStudent = await Student.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    res.status(200).json({ message: "Student updated with id : " + req.params.id, value: updatedStudent });
});


//@desc : Update a student
//@route : DELETE /api/students/:id

const deleteStudent = asyncHandler(async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        res.status(404);
        throw new Error("Student not found");
    }
    const student = await Student.findOne({ _id: req.params.id });
    if (!student || student == null) {
        console.log("here kitty");
        res.status(404);
        throw new Error("Student not found");
    }
    await Student.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "Student deleted with id : " + req.params.id });
});

module.exports = { getStudents, createStudent, getStudent, updateStudent, deleteStudent }


