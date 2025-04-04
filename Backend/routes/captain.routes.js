const captainController = require('../controllers/captain.controller');
const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const authMiddleware = require('../middleware/auth.middleware');

router.post('/register', 
    [
        body('email').isEmail().withMessage('Enter a valid email'),

        body('fullname.firstname').isLength({min: 3}).withMessage('first name must be at least 3 characters long'),

        body('fullname.lastname').isLength({min: 3}).withMessage('last name must be at least 3 characters long'), 

        body('password').isLength({min: 6}).withMessage('password must be at least 6 characters long'),

        body('vehicle.color').isLength({min: 3}).withMessage('color must be at least 3 characters long'),

        body('vehicle.plate').isLength({min: 3}).withMessage('plate must be at least 3 characters long'),

        body('vehicle.capacity').isNumeric().withMessage('capacity must be a number'),

        body('vehicle.vehicleType').isIn(['car', 'auto', 'motercycle']).withMessage('vehicle type must be one of car, auto, motercycle'),
        
    ],
    captainController.registerCaptain
)

router.post('/login', 
    [
        body('email').isEmail().withMessage('Enter a valid email'),

        body('password').isLength({min: 6}).withMessage('password must be at least 6 characters long'),

    ],
    captainController.loginCaptain
)

router.get('/profile', authMiddleware.authCaptain ,captainController.getCaptainProfile)

router.get('/logout', authMiddleware.authCaptain ,captainController.logoutCaptain)

module.exports = router;