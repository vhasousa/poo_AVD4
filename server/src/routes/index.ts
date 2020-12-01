import { Router } from 'express';

import doctorsRouter from './doctor.routes';
import patientsRouter from './patient.routes';
import consultRouter from './consult.routes';

const routes = Router();

routes.use('/doctors', doctorsRouter);
routes.use('/patients', patientsRouter);
routes.use('/consult', consultRouter);

export default routes;
