import express from 'express';
const router = express.Router();

//Especialization Imports
import { listEspecialization } from '../app/controller/especializationController/listEspecialization';
import { listEspecializationById } from '../app/controller/especializationController/listEspecializationById';
import { createEspecialization }  from '../app/controller/especializationController/createEspecialization';
import { listEspecializationDoctors } from '../app/controller/especializationController/listEspecializationDoctors';

//Especialization Routes
router.get('/especializacao', listEspecialization);
router.get('/especializacao/:id', listEspecializationById);
router.get('/especializacao/:id/medico', listEspecializationDoctors);
router.post('/especializacao', createEspecialization);

export const especializationRoutes = router;
