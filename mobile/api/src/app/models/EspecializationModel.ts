/* eslint-disable */
import Sequelize from 'sequelize';
/*eslint-enable*/
import { db } from '../db';

export const Especialization =  db.define('especializacao',{
	id:{
		type: Sequelize.DataTypes.UUID,
		defaultValue: Sequelize.UUIDV4,
		primaryKey: true,
	},
	nome:{
		type: Sequelize.STRING(100),
		allowNull: false
	}
});
