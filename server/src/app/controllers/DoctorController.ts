import { getRepository } from 'typeorm';
import { Request, Response } from 'express';

import Doctor from '../models/Doctor';

class DoctorController {
  public async index(request: Request, response: Response): Promise<Response> {
    const doctorsRepository = getRepository(Doctor);
    const doctors = await doctorsRepository.find({
      select: ['id', 'name', 'specialty'],
    });

    return response.status(200).json(doctors);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { doctor_id } = request.params;

    const patientsRepository = getRepository(Doctor);

    const specialty = await patientsRepository.findOne(doctor_id, {
      select: ['specialty'],
    });

    return response.status(200).json(specialty);
  }

  public async store(request: Request, response: Response): Promise<Response> {
    const { name, specialty } = request.body;

    const doctorsRepository = getRepository(Doctor);

    const doctors = await doctorsRepository.create({ name, specialty });

    await doctorsRepository.save(doctors);

    return response.status(200).json(doctors);
  }
}

export default new DoctorController();
