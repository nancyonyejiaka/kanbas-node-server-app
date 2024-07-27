import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import Lab5 from './Lab5/index.js';
import CourseRoutes from './Kanbas/Courses/routes.js';
import ModuleRoutes from './Kanbas/Modules/routes.js';
import AssignmentRoutes from './Kanbas/Assignments/routes.js';
import UserRoutes from './User/routes.js';

const CONNECTION_STRING =
  process.env.MONGO_CONNECTION_STRING || 'mongodb://127.0.0.1:27017/kanbas';
mongoose.connect(CONNECTION_STRING);

const app = express();

app.use(cors());
app.use(express.json());
UserRoutes(app);

app.get('/', (req, res) => {
  res.send('Welcome to Full Stack Development!');
});
AssignmentRoutes(app);
ModuleRoutes(app);
CourseRoutes(app);
Lab5(app);
app.listen(process.env.PORT || 4000);
