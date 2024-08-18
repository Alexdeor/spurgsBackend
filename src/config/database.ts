import { Sequelize } from 'sequelize';
require('dotenv').config();
const sequelize = new Sequelize(
    process.env.DATABASE as string,
    process.env.DB_USER as string,
    process.env.DB_PASSWORD as string,
    {
    host: process.env.DB_HOST as string,
    dialect: 'mysql',
    logging: false, // Disable logging if you don't want SQL queries to be logged
  });

  export default sequelize; 