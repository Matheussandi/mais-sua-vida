import express from 'express';
const router = express.Router();

//History Imports
import  { createHistory } from '../app/controller/historyController/createHistory';
import  { listHistoryByPatientId } from '../app/controller/historyController/listHistoryByPatientId';
import  { listHistory } from '../app/controller/historyController/listHistory';

//Rotas de Historicos
router.get('/historico', listHistory);
router.get('/historico/:idPaciente/historico', listHistoryByPatientId);
router.post('/historico', createHistory);

export const historyRoutes = router;
