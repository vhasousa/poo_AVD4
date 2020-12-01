import { Router } from 'express';

import DoctorController from '../app/controllers/DoctorController';

const doctorsRouter = Router();

doctorsRouter.get('/', DoctorController.index);
doctorsRouter.get('/:doctor_id', DoctorController.show);
doctorsRouter.post('/', DoctorController.store);

export default doctorsRouter;
