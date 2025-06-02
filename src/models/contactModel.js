import { DataTypes } from 'sequelize';
import sequelize from '../config/db/connection.js';

const Contact = sequelize.define('Contact', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  linkedId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'contacts',
      key: 'id'
    }
  },
  linkPrecedence: {
    type: DataTypes.ENUM('primary', 'secondary'),
    allowNull: false,
    defaultValue: 'primary'
  },

}, {
  tableName: 'contacts',
  timestamps: true,
  indexes: [{ fields: ['phoneNumber'] }, { fields: ['email'] }, { fields: ['linkedId'] }],
  paranoid: true // for soft deletes via deletedAt
});

export default Contact;
