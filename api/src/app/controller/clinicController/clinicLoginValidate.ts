import { Request, Response } from 'express';
import { promisify } from 'util';
import bcrypt from 'bcrypt';

import { Clinic } from '../../models/ClinicModel';

const comparePasswords = promisify(bcrypt.compare);

export async function clinicLoginValidator(request: Request, response: Response) {
  try {
    const { CNPJ, senha } = request.body;

    const validClinic = await Clinic.findOne({ where: { CNPJ: CNPJ } });

    if (!validClinic) {
      return response.status(404).json({ Erro: 'Invalid CNPJ' });
    }

    const validPassword = await comparePasswords(senha, validClinic.senha);

    if (!validPassword) {
      return response.status(401).json({ Error: 'Invalid Password' });
    }

    return response.status(200).json({ Clinic: validClinic });
  } catch (error) {
    console.error('Error during authentication:', error);
    return response.status(500).json({ Error: 'Something went wrong' });
  }
}
