import { Router } from 'express';

import PatientController from '../app/controllers/PatientController';

const patientsRouter = Router();

patientsRouter.get('/', PatientController.index);

patientsRouter.post('/', PatientController.store);

export default patientsRouter;
