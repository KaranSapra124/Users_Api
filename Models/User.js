const mongoose = require("mongoose")


// Defined schema for user
const UserSchema = new mongoose.Schema({
    Name: { type: String, required: true },
    email: { type: String, required: true },
    Password: { type: String, required: true }
})

// Model defined and inherited user schema
const User = mongoose.model("User", UserSchema);

module.exports = User; //Exported user model