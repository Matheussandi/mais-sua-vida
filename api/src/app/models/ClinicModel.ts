import Sequelize from 'sequelize';

import { db } from '../db';

export const Clinic = db.define('clinica',{
	id:{
		type: Sequelize.DataTypes.UUID,
		defaultValue: Sequelize.UUIDV4,
		primaryKey: true,
	},
	clinicImage: {
		type: Sequelize.STRING,
		allowNull: true,
	},
	nome:{
		type: Sequelize.STRING(250),
		allowNull: false,
		unique: true,
	},
	email:{
		type: Sequelize.STRING(250),
		allowNull: false,
		unique: true,
	},
	senha:{
		type: Sequelize.STRING,
		allowNull: false
	},
	CNPJ:{
		type: Sequelize.STRING(14),
		allowNull: false,
		unique: true,
	},
	cidade:{
		type: Sequelize.STRING(250),
		allowNull: false,
	},
	estado:{
		type: Sequelize.STRING(100),
		allowNull: false,
	},
	CEP: {
		type: Sequelize.STRING(100),
		allowNull: false,
	},
	telefone:{
		type: Sequelize.STRING(13),
		allowNull: false,
		unique: true,
	},
	avaliacao:{
		type: Sequelize.DataTypes.ENUM('1', '2', '3', '4', '5'),
		allowNull: true,
	}
});

