import cors from 'cors';
import express from 'express';
import 'dotenv/config';
import session from 'express-session';
import mongoose from 'mongoose';
import 'dotenv/config';
import Lab5 from './Lab5/index.js';
import CourseRoutes from './Kanbas/Courses/routes.js';
import ModuleRoutes from './Kanbas/Modules/routes.js';
import AssignmentRoutes from './Kanbas/Assignments/routes.js';
import UserRoutes from './Users/routes.js';

const CONNECTION_STRING =
  process.env.MONGO_CONNECTION_STRING || 'mongodb://127.0.0.1:27017/kanbas';

mongoose
  .connect(CONNECTION_STRING)
  .then(() => console.log('Connected to MongoDB', CONNECTION_STRING))
  .catch((err) => console.error('Failed to connect to MongoDB', err));

const app = express();

const corsOptions = {
  origin: process.env.NETLIFY_URL || 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(express.json());

const sessionOptions = {
  secret: process.env.SESSION_SECRET || 'kanbas',
  resave: false,
  saveUninitialized: false,
};

if (process.env.NODE_ENV !== 'development') {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: 'none',
    secure: true,
    domain: process.env.NODE_SERVER_DOMAIN,
  };
}

app.use(session(sessionOptions));

UserRoutes(app);

app.get('/', (req, res) => {
  res.send('Welcome to Full Stack Development!');
});
AssignmentRoutes(app);
ModuleRoutes(app);
CourseRoutes(app);
Lab5(app);
app.listen(process.env.PORT || 4000);
