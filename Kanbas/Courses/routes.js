import Database from '../Database/index.js';

import * as dao from './dao.js';

let currentCourse = null;

// export default
export default function CourseRoutes(app) {
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
    const { number } = req.params;
    const course = req.body;
    const status = await dao.updateCourse(number, course);
    res.json(status);
  };

  app.post('/api/courses', createCourse);
  app.get('/api/courses', findAllCourses);
  app.get('/api/courses/:id', findCourseById);
  app.put('/api/courses/:number', updateCourse);
  app.delete('/api/courses/:number', deleteCourse);
}
