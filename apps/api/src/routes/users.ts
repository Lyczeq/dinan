import express from 'express';
import {
  getExamsCreatedBySpecificUser,
  getUserCertificates,
} from '../controllers/users';

export const router = express.Router();
router.route('/:address/exams').get(getExamsCreatedBySpecificUser);
router.route('/:address/certificates').get(getUserCertificates);
