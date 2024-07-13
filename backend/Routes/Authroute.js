import express from 'express';
const router = express.Router();

import { test, signup, signin } from '../Controllers/Authcontrollers.js';

router.route('/test').get(test);
router.route('/signup').post(signup);
router.route('/signin').post(signin);
export default router;