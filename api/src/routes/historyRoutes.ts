import express from 'express';
const router = express.Router();

import { verifyToken } from '../../src/app/middlewares/auth';

import  { createHistory } from '../app/controller/historyController/createHistory';
import  { listHistoryByPatientId } from '../app/controller/historyController/listHistoryByPatientId';
import  { listHistory } from '../app/controller/historyController/listHistory';

router.get('/historico', verifyToken, listHistory);
router.get('/historico/:idPaciente/historico', verifyToken, listHistoryByPatientId);
router.post('/historico', verifyToken, createHistory);

export const historyRoutes = router;
