const mongoose = require("mongoose");

// Enable debugging for mongoose queries
mongoose.set("debug", true);

// Use global Promise for mongoose
mongoose.Promise = global.Promise;

// Connection string (Ensure password is URL-encoded)
const dbURI = "mongodb+srv://Internship:Himavanth%402004@cluster0.iqqgof2.mongodb.net/<database>?retryWrites=true&w=majority";

// Connect to MongoDB
mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log("MongoDB connected successfully");
})
.catch((err) => {
    console.error("MongoDB connection error:", err);
});

// Export models
module.exports.Student = require("./student");
module.exports.Internship = require("./internship");
module.exports.Notices = require("./notices");
module.exports.Faculty = require("./faculty");
