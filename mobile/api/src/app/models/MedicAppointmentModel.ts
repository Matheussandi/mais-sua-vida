import Sequelize from 'sequelize';

import { db } from '../db';

import { Doctor } from './DoctorModel';
import { Patient } from './PatientModel';

export const MedicalAppointment = db.define('consulta',{
	id: {
		type: Sequelize.DataTypes.UUID,
		defaultValue: Sequelize.UUIDV4,
		primaryKey: true,
	},
	data: {
		type: Sequelize.DataTypes.DATEONLY,
		allowNull: false,
	},
	hora: {
		type: Sequelize.DataTypes.TIME,
		allowNull: false
	},
	local: {
		type: Sequelize.DataTypes.STRING(250),
		allowNull: false,
	},
	idPaciente: {
		type: Sequelize.DataTypes.UUID,
		allowNull: false,
	},
	idMedico: {
		type: Sequelize.DataTypes.UUID,
		allowNull: false
	}
});

MedicalAppointment.belongsTo(Patient, { foreignKey: 'idPaciente'});
MedicalAppointment.belongsTo(Doctor, { foreignKey: 'idMedico'});