import express from 'express';

import multer from 'multer';
import { storage } from '../multerConfig';

const router = express.Router();
const upload = multer({ storage: storage});

import { verifyToken } from '../../src/app/middlewares/auth';

import { listClinics } from '../app/controller/clinicController/listClinics';
import { listClinicById } from '../app/controller/clinicController/listClinicById';
import { createClinic } from '../app/controller/clinicController/createClinic';
import { updateClinic } from '../app/controller/clinicController/updateClinic';
import { clinicLoginValidator } from '../app/controller/clinicController/clinicLoginValidate';
import { listClinicDoctors } from '../app/controller/clinicController/listClinicDoctors';

router.post('/clinica/login', clinicLoginValidator);
router.get('/clinica', verifyToken, listClinics);
router.get('/clinica/:id', verifyToken, listClinicById);
router.get('/clinica/:id/medico', verifyToken, listClinicDoctors);
router.post('/clinica', upload.single('clinicImage'), createClinic);
router.put('/clinica/:id', verifyToken, upload.single('clinicImage'), updateClinic);

export const clinicRoutes = router;