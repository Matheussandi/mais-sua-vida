import { Request, Response } from "express";
import { promisify } from "util";
import bcrypt from "bcrypt";

import { Doctor } from "../../models/DoctorModel";

const comparePasswords = promisify(bcrypt.compare);

export async function doctorLoginValidate(
  request: Request,
  response: Response
) {
  try {
    const { email, senha } = request.body;

    const validDoctor = await Doctor.findOne({ where: { email: email } });

    if (!validDoctor) {
      return response.status(404).json({ Error: "E-mail não encontrado" });
    }

    const validPassword = await comparePasswords(senha, validDoctor.senha);

    if (!validPassword) {
      return response.status(401).json({ Error: "Senha inválida" });
    }

    return response.status(200).json({ Doctor: validDoctor });
  } catch (error) {
    return response.status(500).json({ error });
  }
}
