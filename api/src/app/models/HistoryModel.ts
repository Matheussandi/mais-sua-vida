import Sequelize from 'sequelize';

import { db } from '../db';
import { Doctor } from './DoctorModel';
import { Patient } from './PatientModel';


export const History = db.define('historico',{
	id:{
		type: Sequelize.DataTypes.UUID,
		defaultValue: Sequelize.UUIDV4,
		primaryKey: true,
	},
	data:{
		type: Sequelize.DataTypes.STRING,
		allowNull: false
	},
	descricao:{
		type: Sequelize.DataTypes.STRING(500),
		allowNull: false,
	},
	idPaciente: {
		type: Sequelize.DataTypes.UUID,
		allowNull: false
	},
	idMedico: {
		type: Sequelize.DataTypes.UUID,
		allowNull: false
	}

});

History.belongsTo(Patient, { foreignKey: 'idPaciente' });
History.hasMany(Doctor, { foreignKey: 'idMedico' });
