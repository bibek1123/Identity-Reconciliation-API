import { Sequelize } from 'sequelize';
import { MYSQL } from '../config.js';

const sequelize = new Sequelize(
  MYSQL.DB_DATABASE,
  MYSQL.DB_USERNAME,
  MYSQL.DB_PASSWORD,
  {
    host: MYSQL.DB_HOST,
    dialect: MYSQL.DB_CONNECTION,
  }
);

export default sequelize;
