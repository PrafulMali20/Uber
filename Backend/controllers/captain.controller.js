const { hash } = require('bcrypt');
const captainModel = require('../models/captain.model');
const captinService = require('../services/captain.service');
const { validationResult } = require('express-validator');




module.exports.registerCaptain = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {fullname, email, password, vehicle} = req.body;

    const isCaptainExist = await captainModel.findOne({ email });
    if (isCaptainExist) {
        return res.status(400).json({ message: "Captain already exists" });
    }

    const hashedPassword = await hash(password, 10);
    const captain = await captinService.createCaptain({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword,
        color: vehicle.color,
        plate: vehicle.plate,
        capacity: vehicle.capacity,
        vehicleType: vehicle.vehicleType,
    });

    const token = captain.generateAuthToken();
    res.status(201).json({ token, captain });
}