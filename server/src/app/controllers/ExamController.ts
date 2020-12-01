// import { Between, getRepository } from 'typeorm';
// import { Request, Response } from 'express';

// import Exam from '../models/Exam';

// class ExamController {
//   public async store(request: Request, response: Response): Promise<Response> {
//     const { name, shelfLife } = request.body;

//     const examsRepository = getRepository(Exam);

//     const exam = examsRepository.create({ name, shelfLife });

//     await examsRepository.save(exam);

//     return response.status(200).json(exam);
//   }

//   public async index(request: Request, response: Response): Promise<Response> {
//     const { startDate, endDate } = request.body;

//     const examsRepository = getRepository(Exam);

//     const exam = await examsRepository.find({
//       where: {
//         selfDate: Between(startDate, endDate),
//       },
//     });

//     return response.status(200).json(exam);
//   }
// }

// export default new ExamController();
