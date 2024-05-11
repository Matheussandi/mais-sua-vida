import express from 'express';

import multer from 'multer';
import { storage } from '../multerConfig';

const router = express.Router();
const upload = multer({ storage: storage});

import { listPatients } from '../app/controller/patientController/listPatients';
import { listPatientById } from '../app/controller/patientController/listPatientById';
import { createPatient } from '../app/controller/patientController/createPatient';
import { updatePatient } from '../app/controller/patientController/updatePatient';
import { patientLoginValidator } from '../app/controller/patientController/patientLoginValidate';

import { verifyToken } from '../../src/app/middlewares/auth';

router.get('/paciente', verifyToken, listPatients);
router.get('/paciente/:id', verifyToken, listPatientById);
router.post('/paciente', upload.single('patientImage'), createPatient);
router.post('/paciente/login', patientLoginValidator);
router.put('/paciente/:id', verifyToken, upload.single('patientImage'), updatePatient);

export const patientRoutes = router;
