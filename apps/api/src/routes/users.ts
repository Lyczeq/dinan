import express from 'express';
import { getExamsCreatedBySpecificUser } from '../controllers/users';

export const router = express.Router();
router.route('/:address/exams').get(getExamsCreatedBySpecificUser);
