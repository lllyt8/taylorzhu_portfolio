import express from 'express';
import { handleFormSubmission } from '../controllers/formController';
import { validateRequest } from '../middleware/auth';

const router = express.Router();

router.post('/submit', validateRequest, handleFormSubmission);

export default router;
