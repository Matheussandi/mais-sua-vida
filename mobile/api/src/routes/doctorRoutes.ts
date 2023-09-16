import express from 'express';

import multer from 'multer';
import { storage } from '../multerConfig';

const router = express.Router();
const upload = multer({ storage: storage});

//Doctor Imports
import { listDoctors } from '../app/controller/doctorController/listDoctor';
import { listDoctorById } from '../app/controller/doctorController/listDoctorById';
import { createDoctor } from '../app/controller/doctorController/createDoctor';
import { updateDoctor } from '../app/controller/doctorController/updateDoctor';
import { doctorLoginValidate } from '../app/controller/doctorController/doctorLoginValidate';


//Rotas de Médicos
router.get('/medico', listDoctors);
router.get('/medico/:id', listDoctorById);
router.post('/medico', upload.single('doctorImage'), createDoctor);
router.post('/medico/login', doctorLoginValidate);
router.put('/medico/:id', upload.single('doctorImage'), updateDoctor);

export const doctorRoutes = router;
