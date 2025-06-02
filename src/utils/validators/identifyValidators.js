import Joi from 'joi';
import { MESSAGE } from '../../config/constants/message.js';

// Validation schema for /identify routes
export const identifySchema = Joi.object({
  email: Joi.string().email().optional().messages({
    'string.email': MESSAGE.VALIDATION.EMAIL_INVALID,
  }),
  phoneNumber: Joi.string().optional().messages({
    'string.base': MESSAGE.VALIDATION.PHONE_STRING,
  }),
}).or('email', 'phoneNumber') // At least one is required
  .messages({
    'object.missing': MESSAGE.VALIDATION.MISSING_EMAIL_OR_PHONE,
  }).unknown(false)
