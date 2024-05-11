import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { Doctor } from "../../models/DoctorModel";

export async function doctorLoginValidate(request: Request, response: Response) {
  const { email, senha } = request.body;

  try {
    const validDoctor = await Doctor.findOne({ where: { email } });

    if (!validDoctor) {
      return response.status(404).json({ Error: "E-mail não encontrado" });
    }

    const validPassword = await bcrypt.compare(senha, validDoctor.senha);

    if (!validPassword) {
      return response.status(401).json({ Error: "Senha inválida" });
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      return response.status(500).json({ error: "Chave secreta não definida" });
    }

    const token = jwt.sign({ id: validDoctor.id }, secret, { expiresIn: "1h" });

    return response.status(200).json({ 
      user: {
        id: validDoctor.id,
        name: validDoctor.nome,
        email: validDoctor.email,
      },
      token 
    });
  } catch (error) {
    console.error("Erro durante a autenticação:", error);
    return response.status(500).json({ Error: "Algo deu errado" });
  }
}