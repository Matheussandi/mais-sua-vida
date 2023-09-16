import Sequelize from 'sequelize';

import { db } from '../db';
import { Especialization } from './EspecializationModel';
import { Clinic } from './ClinicModel';

export const Doctor = db.define('medico',{
	id:{
		type: Sequelize.DataTypes.UUID,
		defaultValue: Sequelize.UUIDV4,
		primaryKey: true,
	},
	nome:{
		type: Sequelize.STRING(250),
		allowNull: false
	},
	sobrenome:{
		type: Sequelize.STRING(250),
		allowNull: false
	},
	CRM:{
		type: Sequelize.STRING(12),
		allowNull: false,
		unique: true
	},
	doctorImage:{
		type: Sequelize.STRING,
		allowNull: true
	},
	email:{
		type: Sequelize.STRING(100),
		allowNull: false,
		unique: true
	},
	senha: {
		type: Sequelize.DataTypes.STRING,
		allowNull: false
	},
	sobre:{
		type: Sequelize.DataTypes.STRING(500),
		allowNull: true,
	},
	experiencia:{
		type: Sequelize.DataTypes.STRING(500),
		allowNull: true,
	},
	avaliacao:{
		type: Sequelize.DataTypes.ENUM('1', '2', '3', '4', '5'),
		allowNull: true,
	},
	idEspecializacao:{
		type: Sequelize.DataTypes.UUID,
		allowNull: false,
	},
	idClinica:{
		type: Sequelize.DataTypes.UUID,
		allowNull: false,
	}
});

Doctor.belongsTo(Especialization,{ foreignKey: 'idEspecializacao' });
Doctor.belongsTo(Clinic, {foreignKey: 'idClinica'});
