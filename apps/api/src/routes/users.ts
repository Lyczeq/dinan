import express from 'express';
import {
  getExamsCreatedBySpecificUser,
  getUserCertificates,
  getNFTMetadata,
  getUserScoreOfSpecificExam,
} from '../controllers/users';

export const router = express.Router();
router.route('/:address/exams').get(getExamsCreatedBySpecificUser);
router.route('/:address/certificates').get(getUserCertificates);
router.route('/:address/certificates/:certAddress').get(getNFTMetadata);
router.route('/:address/exams/:examAddress').get(getUserScoreOfSpecificExam);
