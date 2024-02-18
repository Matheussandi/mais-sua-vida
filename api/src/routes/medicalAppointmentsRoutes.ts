import express from 'express';
const router = express.Router();

import	{ listMedicalAppointmentsById } from '../app/controller/medicalAppointment/listMedicalAppointmentsById';
import	{ listMedicalAppointments } from '../app/controller/medicalAppointment/listMedicalAppointments';
import { createMedicalAppointments } from '../app/controller/medicalAppointment/createMedicalAppointments';
import { updateMedicalAppointments } from '../app/controller/medicalAppointment/updateMedicalAppointments';
import { deleteMedicalAppointment } from '../app/controller/medicalAppointment/deleteMedicalAppointment';
import { listAppointmentsByIdPatient } from '../app/controller/medicalAppointment/listAppointmentByIdPatient';

import { verifyToken } from '../../src/app/middlewares/auth';

router.get('/consultas', verifyToken, listMedicalAppointments);
//router.get('/consultas/:id', listMedicalAppointmentsById);
router.get('/consultas/:idPaciente', verifyToken, listAppointmentsByIdPatient);
router.post('/consultas', verifyToken, createMedicalAppointments);
router.put('/consultas/:id', verifyToken, updateMedicalAppointments);
router.delete('/consultas/:id', verifyToken, deleteMedicalAppointment);

export const medicalAppointments = router;