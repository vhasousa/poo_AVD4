import { Router } from 'express';

import ConsultationController from '../app/controllers/ConsultationController';

const consultRouter = Router();

consultRouter.get('/', ConsultationController.index);
consultRouter.post('/', ConsultationController.store);
consultRouter.delete('/:id', ConsultationController.delete);
consultRouter.put('/:id', ConsultationController.update);

export default consultRouter;
