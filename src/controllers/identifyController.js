import { handleIdentify } from '../services/identifyService.js'
import { MESSAGE } from '../config/constants/message.js'

// identify customer
export const identifyCustomer = async (req, res) => {
    try {
        const result = await handleIdentify(req.body);
        res.message = MESSAGE.CUSTOMER.CONTACT_IDENTIFY_SUCCESSFULLY
        return util.successResponse(result, res);
    } catch (err) {
        res.message = err.message;
        return util.internalServerErrorResponse(res);
    }
}