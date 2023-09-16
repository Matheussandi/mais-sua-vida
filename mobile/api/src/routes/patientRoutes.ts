import express from 'express';

import multer from 'multer';
import { storage } from '../multerConfig';

const router = express.Router();
const upload = multer({ storage: storage});


//Patient Imports
import { listPatients } from '../app/controller/patientController/listPatients';
import { listPatientById } from '../app/controller/patientController/listPatientById';
import { createPatient } from '../app/controller/patientController/createPatient';
import { updatePatient } from '../app/controller/patientController/updatePatient';
import { patientLoginValidator } from '../app/controller/patientController/patientLoginValidate';


//Rotas de Pacientes
router.get('/paciente', listPatients);
router.get('/paciente/:id', listPatientById);
router.post('/paciente', upload.single('patientImage'), createPatient);
router.post('/paciente/login', patientLoginValidator);
router.put('/paciente/:id', upload.single('patientImage'), updatePatient);

export const patientRoutes = router;
