import { Request, Response } from "express";

import { verifyEmpityFields } from "../../../utils/verifyEmptyFields";
import bcrypt from "bcrypt";
import fs from "fs";
import jwt from "jsonwebtoken";

import { Patient } from "../../models/PatientModel";

export async function createPatient(request: Request, response: Response) {
  try {
    const patientImage = request.file?.filename;

    const {
      nome,
      sobrenome,
      CPF,
      email,
      senha,
      telefone,
      dataNascimento,
      altura,
      peso,
    } = request.body;

    const fields = [
      { value: nome, nome: "Nome" },
      { value: sobrenome, nome: "Sobrenome" },
      { value: CPF, nome: "CPF" },
      { value: email, nome: "E-mail" },
      { value: senha, nome: "Senha" },
      { value: telefone, nome: "Telefone" },
    ];

    const erros = verifyEmpityFields(fields);

    if (Object.keys(erros).length > 0) {
      return response.status(400).json(erros);
    }

    const encryptedPassword = await bcrypt.hash(senha, 10);

    const patient = await Patient.create({
      nome,
      sobrenome,
      patientImage,
      CPF,
      email,
      senha: encryptedPassword,
      telefone,
      dataNascimento,
      altura,
      peso,
    });

    const token = jwt.sign({ id: patient.id }, "your_secret_key", {
      expiresIn: "1d",
    });

    return response.status(201).json({
      user: {
        id: patient.id,
        name: nome,
        email: email,
      },
      token,
    });
  } catch (error) {
    if (request.file) {
      try {
        fs.unlinkSync(request.file.path);
      } catch (error) {
        console.error("Something went wrong while deleting file");
      }
    }
    response.status(400).json({ Error: "Something went wrong!" });
  }
}
