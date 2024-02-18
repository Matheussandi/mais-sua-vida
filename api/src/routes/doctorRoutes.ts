import express from 'express';

import multer from 'multer';
import { storage } from '../multerConfig';

const router = express.Router();
const upload = multer({ storage: storage});

import { verifyToken } from '../../src/app/middlewares/auth';

import { listDoctors } from '../app/controller/doctorController/listDoctor';
import { listDoctorById } from '../app/controller/doctorController/listDoctorById';
import { createDoctor } from '../app/controller/doctorController/createDoctor';
import { updateDoctor } from '../app/controller/doctorController/updateDoctor';
import { doctorLoginValidate } from '../app/controller/doctorController/doctorLoginValidate';


router.get('/medico', verifyToken, listDoctors);
router.get('/medico/:id', verifyToken, listDoctorById);
router.post('/medico', verifyToken, upload.single('doctorImage'), createDoctor);
router.post('/medico/login', doctorLoginValidate);
router.put('/medico/:id', verifyToken, upload.single('doctorImage'), updateDoctor);

export const doctorRoutes = router;
