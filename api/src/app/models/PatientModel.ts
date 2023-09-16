import Sequelize from 'sequelize';

import { db } from '../db';

export const Patient = db.define('paciente',{
	id:{
		type: Sequelize.DataTypes.UUID,
		defaultValue: Sequelize.UUIDV4,
		primaryKey: true,
	},
	nome: {
		type: Sequelize.DataTypes.STRING(250),
		allowNull: false,
	},
	sobrenome: {
		type: Sequelize.DataTypes.STRING(250),
		allowNull: false,
	},
	patientImage: {
		type: Sequelize.DataTypes.STRING,
		allowNull: true,
	},
	CPF: {
		type: Sequelize.DataTypes.STRING(11),
		allowNull: false,
		unique: true
	},
	email: {
		type: Sequelize.DataTypes.STRING(100),
		allowNull: false,
		unique: true,
	},
	senha: {
		type: Sequelize.DataTypes.STRING,
		allowNull: false
	},
	telefone: {
		type: Sequelize.DataTypes.STRING(13),
		allowNull: false,
		unique: true
	},
	dataNascimento: {
		type: Sequelize.DataTypes.DATEONLY,
		allowNull: true
	},
	altura:{
		type: Sequelize.DataTypes.STRING,
		allowNull: true,
	},
	peso:{
		type: Sequelize.DataTypes.STRING,
		allowNull: true,
	}
});
