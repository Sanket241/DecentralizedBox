import express from 'express';
const router = express.Router();

import { test, signup, signin } from '../Controllers/Authcontrollers.js';

router.route('/test').get(test);
router.route('/signup').get(signup);
router.route('/signin').get(signin);
export default router;