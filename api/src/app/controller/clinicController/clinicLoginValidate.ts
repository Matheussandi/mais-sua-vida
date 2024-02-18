import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { Clinic } from "../../models/ClinicModel";

export async function clinicLoginValidator(request: Request, response: Response) {
  const { email, senha } = request.body;

  try {
    const clinic = await Clinic.findOne({ where: { email } });
    if (!clinic) {
      return response.status(404).json({ Erro: "Invalid email" });
    }

    const isPasswordValid = await bcrypt.compare(senha, clinic.senha);
    if (!isPasswordValid) {
      return response.status(401).json({ Error: "Invalid Password" });
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      return response.status(500).json({ error: "Secret key not defined" });
    }

    const token = jwt.sign({ id: clinic.id }, secret, { expiresIn: "1h" });

    return response.status(200).json({ token });
  } catch (error) {
    console.error("Error during authentication:", error);
    return response.status(500).json({ Error: "Something went wrong" });
  }
}