const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const captainSchema = new mongoose.Schema({
  fullname: {
    firstname: {
      type: String,
      required: true,
      minlength: [3, "first name must be at least 3 characters long"],
    },
    lastname: {
      type: String,
      minlength: [3, "last name must be at least 3 characters long"],
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+\@.+\..+/, "Enter a valid email"],
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  socketId: {
    type: String,
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "inactive",
  },
  vehicle: {
    color: {
      type: String,
      required: true,
      minlength: [3, "color must be at least 3 characters long"],
    },
    plate: {
      type: String,
      required: true,
      minlength: [3, "plate must be at least 3 characters long"],
    },
    capacity: {
      type: Number,
      required: true,
      min: [1, "capacity must be at least 1"],
    },
    vehicleType: {
      type: String,
      enum: ["car", "auto", "motercycle"],
      required: true,
    },
  },
  location: {
    lat: {
      type: Number,
    },
    long: {
      type: Number,
    },
  },
});

captainSchema.methods.generateAuthToken = function () {
    const token = jwt.sign(
      { _id: this._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "24h" }
    );
    return token;
  };

captainSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  }

captainSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
  };

const captainModel = mongoose.model("captains", captainSchema);

module.exports = captainModel;