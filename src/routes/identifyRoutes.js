import express from 'express';
import {identifyCustomer} from '../controllers/identifyController.js';
import {identifySchema} from '../utils/validators/identifyValidators.js'
import {validate} from '../middlewares/validate.js'

const router = express.Router();

// identify routes 
router.post('/', validate(identifySchema, 'body'), identifyCustomer);


export default router;
