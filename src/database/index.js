// Connection in BDA and upload models
import Sequelize from 'sequelize';

import Student from '../app/models/Student';
import User from '../app/models/User';

import databaseConfig from '../config/database';

const models = [Student, User]; // Posso colocar outros models -> [Student, User, Job ...]

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models.map(model => model.init(this.connection));
  }
}

export default new Database();
