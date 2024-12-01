import { Router } from "express";
import { body } from "express-validator";
import {authCaptain} from "../middleware/auth_middleware.js";
import {registerCaptain,loginCaptain,getCaptainProfile,logoutCaptain} from  './captain_controller.js'
const captainRouter = Router();

captainRouter.post('/register', 
    [
        body('email').isEmail().withMessage('Invalid Email'),
        body('firstname').isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),
        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
        body('vehicleColor').isLength({ min: 3 }).withMessage('Color must be at least 3 characters long'),
        body('vehiclePlate').isLength({ min: 3 }).withMessage('Plate must be at least 3 characters long'),
        body('vehicleCapacity').isInt({ min: 1 }).withMessage('Capacity must be at least 1'),
        body('vehicleType').isIn([ 'car', 'motorcycle', 'auto' ]).withMessage('Invalid vehicle type')
    ],
    registerCaptain
)


captainRouter.post('/login',
    [
        body('email').isEmail().withMessage('Invalid Email'),
        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
    ],
    loginCaptain
)


captainRouter.get('/profile', authCaptain, getCaptainProfile)

captainRouter.get('/logout', authCaptain, logoutCaptain)

export default captainRouter