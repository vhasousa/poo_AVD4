import { getRepository } from 'typeorm';
import { Response, Request } from 'express';
import { startOfHour, parseISO, isBefore } from 'date-fns';

import Consultation from '../models/Consultation';

class ConsultationController {
  public async index(request: Request, response: Response): Promise<Response> {
    const doctorsRepository = getRepository(Consultation);
    const doctors = await doctorsRepository.find({
      relations: ['doctor', 'patient'],
      select: ['id', 'consultation_date'],
    });

    return response.status(200).json(doctors);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const consultationsRepository = getRepository(Consultation);
    const consultation = await consultationsRepository.delete(id);

    return response.status(200).json(consultation);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const consultationsRepository = getRepository(Consultation);
    const consultation = await consultationsRepository.update(id, request.body);

    return response.status(200).json(consultation);
  }

  public async store(request: Request, response: Response): Promise<Response> {
    const { consultation_date, doctor_id, patient_id } = request.body;

    const consultationsRepository = getRepository(Consultation);

    const hourStart = startOfHour(parseISO(consultation_date));

    // if (isBefore(hourStart, new Date())) {
    //   return response
    //     .status(400)
    //     .json({ error: 'Past date are not permitted' });
    // }

    const checkAvailability = await consultationsRepository.findOne({
      where: { consultation_date: hourStart, doctor_id },
    });

    if (checkAvailability) {
      return response
        .status(400)
        .json({ error: 'Consultation date is not available' });
    }

    const consultation = consultationsRepository.create({
      consultation_date: hourStart,
      doctor_id,
      patient_id,
    });

    await consultationsRepository.save(consultation);

    return response.status(200).json(consultation);
  }
}

export default new ConsultationController();
