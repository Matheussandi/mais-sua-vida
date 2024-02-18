import express from 'express';
const router = express.Router();

import { verifyToken } from '../../src/app/middlewares/auth';

import { listEspecialization } from '../app/controller/especializationController/listEspecialization';
import { listEspecializationById } from '../app/controller/especializationController/listEspecializationById';
import { createEspecialization }  from '../app/controller/especializationController/createEspecialization';
import { listEspecializationDoctors } from '../app/controller/especializationController/listEspecializationDoctors';

router.get('/especializacao', verifyToken, listEspecialization);
router.get('/especializacao/:id', verifyToken, listEspecializationById);
router.get('/especializacao/:id/medico', verifyToken, listEspecializationDoctors);
router.post('/especializacao', verifyToken, createEspecialization);

export const especializationRoutes = router;
