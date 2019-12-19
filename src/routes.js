import { Router } from 'express';

import StudentController from './app/controller/StudentController';
import UserController from './app/controller/UserController';
import SessionController from './app/controller/SessionController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/students', authMiddleware, StudentController.store); // Create student
routes.post('/users', UserController.store); // Create user
routes.post('/sessions', SessionController.store); // Login

routes.put('/students', StudentController.update); // Update student

export default routes;
