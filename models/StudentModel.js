const mongoose = require("mongoose");

const studentSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add Student name"]
    },
    email: {
        type: String,
        required: [true, "Please add Student email"]
    },
    phone: {
        type: String,
        required: [true, "Please add Student phone"]
    }

});

module.exports = mongoose.model("Student", studentSchema);