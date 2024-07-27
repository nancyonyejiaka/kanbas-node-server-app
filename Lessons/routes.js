import * as dao from './dao.js';

function LessonRoutes(app) {
  const createLesson = async (req, res) => {
    const lesson = await dao.createLesson(req.body);
    res.json(lesson);
  };

  const deleteLesson = async (req, res) => {
    const status = await dao.deleteLesson(req.params.lessonId);
    res.json(status);
  };

  const findAllLessons = async (req, res) => {
    const { name } = req.query;

    if (name) {
      const lessons = await dao.findLessonsByPartialName(name);
      res.json(lessons);
      return;
    }

    const lessons = await dao.findAllLessons();
    res.json(lessons);
  };

  const findLessonById = async (req, res) => {
    const lesson = await dao.findLessonById(req.params.aid);
    res.json(lesson);
  };

  const updateLesson = async (req, res) => {
    const { lessonId } = req.params;
    const status = await dao.updateLesson(lessonId, req.body);
    res.json(status);
  };

  app.post('/api/lessons', createLesson);
  app.get('/api/lessons', findAllLessons);
  app.get('/api/lessons/:lid', findLessonById);
  app.put('/api/lessons/:lid', updateLesson);
  app.delete('/api/lessons/:lid', deleteLesson);
}
