import express from 'express';
import Lab5 from './Lab5/index.js';
import CourseRoutes from './Kanbas/Courses/routes.js';
import ModuleRoutes from './Kanbas/Modules/routes.js';
import AssignmentRoutes from './Kanbas/Assignments/routes.js';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
    res.send('Welcome to Full Stack Development!')})
AssignmentRoutes(app);
ModuleRoutes(app);
CourseRoutes(app);
Lab5(app);
app.listen(process.env.PORT || 4000);
