import dotenv from 'dotenv';
dotenv.config();

const dbHost = process.env.DB_HOST;
const dbPort = process.env.DB_PORT;
const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;

/* eslint-disable */
const Sequelize = require('sequelize');
/*eslint-enable*/


//Conectando com o banco de dados
export const db = new Sequelize(dbName, dbUser, dbPassword, {
	host: dbHost,
	port: dbPort,
	dialect: 'mysql',
	logging: false,
});