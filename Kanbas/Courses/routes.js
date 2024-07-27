import Database from '../Database/index.js';

import * as dao from './dao.js';

let currentCourse = null;

// export default
function CourseRoutes1(app) {
  const createCourse = async (req, res) => {
    const course = await dao.createCourse(req.body);
    res.json(course);
  };

  const deleteCourse = async (req, res) => {
    const { id } = req.params;
    const status = await dao.deleteCourse(id);
    res.json(status);
  };

  const findAllCourses = async (req, res) => {
    const { name, number } = req.query;

    if (name) {
      const courses = await dao.findCoursesByPartialName(name);
      res.json(courses);
      return;
    }

    if (number) {
      const courses = await dao.findCourseByNumber(number);
      res.json(courses);
      return;
    }

    const courses = await dao.findAllCourses();
    res.json(courses);
  };

  const findCourseById = async (req, res) => {
    const { id } = req.params;
    const courses = await dao.findCourseById(id);
    res.send(courses);
  };

  const updateCourse = async (req, res) => {
    const { id } = req.params;
    const course = req.body;
    const courses = await dao.updateCourse(id, course);
    res.sendStatus(204);
  };

  app.post('/api/courses', createCourse);
  app.get('/api/courses', findAllCourses);
  app.get('/api/courses', findCourseById);
  app.put('/api/courses/:id', updateCourse);
  app.delete('/api/courses/:id', deleteCourse);
}

export default function CourseRoutes(app) {
  app.put('/api/courses/:id', (req, res) => {
    const { id } = req.params;
    const course = req.body;
    Database.courses = Database.courses.map((c) =>
      c._id === id ? { ...c, ...course } : c
    );
    res.sendStatus(204);
  });

  app.delete('/api/courses/:id', (req, res) => {
    const { id } = req.params;
    Database.courses = Database.courses.filter((c) => c._id !== id);
    res.sendStatus(204);
  });

  app.post('/api/courses', (req, res) => {
    const course = { ...req.body, _id: new Date().getTime().toString() };
    Database.courses.push(course);
    res.send(course);
  });

  app.get('/api/courses', (req, res) => {
    const courses = Database.courses;
    res.send(courses);
  });
}
