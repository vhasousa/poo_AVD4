import { getRepository } from 'typeorm';
import { Request, Response } from 'express';

import Patient from '../models/Patient';

class PatientController {
  public async index(request: Request, response: Response): Promise<Response> {
    const patientsRepository = getRepository(Patient);
    const patients = await patientsRepository.find({
      select: ['id', 'name'],
    });

    return response.status(200).json(patients);
  }

  public async store(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    const patientsRepository = getRepository(Patient);

    const patients = await patientsRepository.create({ name });

    await patientsRepository.save(patients);

    return response.status(200).json(patients);
  }
}

export default new PatientController();
