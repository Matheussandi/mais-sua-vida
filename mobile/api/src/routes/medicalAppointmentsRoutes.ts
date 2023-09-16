import express from 'express';
const router = express.Router();

//MedicalAppointment imports
import	{ listMedicalAppointmentsById } from '../app/controller/medicalAppointment/listMedicalAppointmentsById';
import	{ listMedicalAppointments } from '../app/controller/medicalAppointment/listMedicalAppointments';
import { createMedicalAppointments } from '../app/controller/medicalAppointment/createMedicalAppointments';
import { updateMedicalAppointments } from '../app/controller/medicalAppointment/updateMedicalAppointments';
import { deleteMedicalAppointment } from '../app/controller/medicalAppointment/deleteMedicalAppointment';
import { listAppointmentsByIdPatient } from '../app/controller/medicalAppointment/listAppointmentByIdPatient';

//Rotas de Consultas
router.get('/consultas', listMedicalAppointments);
//router.get('/consultas/:id', listMedicalAppointmentsById);
router.get('/consultas/:idPaciente', listAppointmentsByIdPatient);
router.post('/consultas', createMedicalAppointments);
router.put('/consultas/:id', updateMedicalAppointments);
router.delete('/consultas/:id', deleteMedicalAppointment);

export const medicalAppointments = router;