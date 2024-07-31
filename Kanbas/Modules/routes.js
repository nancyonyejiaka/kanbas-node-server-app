import db from '../Database/index.js';

import * as dao from './dao.js';

export default function ModuleRoutes(app) {
  const createModule = async (req, res) => {
    const module = await dao.createModule(req.body);
    res.json(module);
  };

  const deleteModule = async (req, res) => {
    const { mid } = req.params;
    const status = await dao.deleteCourse(mid);
    res.json(status);
  };

  const findAllModules = async (req, res) => {
    const { name } = req.query;

    if (name) {
      const modules = await dao.findModulesByPartialName(name);
      res.json(modules);
      return;
    }

    const modules = await dao.findAllModules();
    res.json(modules);
  };

  const findModuleByCourseNumber = async (req, res) => {
    const { number } = req.params;
    const modules = await dao.findModuleByCourseNumber(number);
    res.send(modules);
  };

  const findModuleById = async (req, res) => {
    const { mid } = req.params;
    const module = await dao.findModuleById(mid);
    res.send(module);
  };

  const updateModule = async (req, res) => {
    const module = req.body;
    const status = await dao.updateModule(module._id, module);
    res.json(status);
  };

  app.post('/api/courses/:number/modules', createModule);
  app.get('/api/courses/:number/modules', findModuleByCourseNumber);
  app.get('/api/courses/:number/modules/:mid', findModuleById);
  app.put('/api/modules/:mid', updateModule);
  app.delete('/api/modules/:mid', deleteModule);
}

function ModuleRoutes1(app) {
  app.put('/api/modules/:mid', (req, res) => {
    const { mid } = req.params;
    const moduleIndex = db.modules.findIndex((m) => m._id === mid);
    db.modules[moduleIndex] = {
      ...db.modules[moduleIndex],
      ...req.body,
    };
    res.sendStatus(204);
  });

  app.delete('/api/modules/:mid', (req, res) => {
    const { mid } = req.params;
    db.modules = db.modules.filter((m) => m._id !== mid);
    res.sendStatus(200);
  });

  app.post('/api/courses/:cid/modules', (req, res) => {
    const { cid } = req.params;
    const newModule = {
      ...req.body,
      course: cid,
      _id: new Date().getTime().toString(),
    };
    db.modules.push(newModule);
    res.send(newModule);
  });

  app.get('/api/courses/:cid/modules', (req, res) => {
    const { cid } = req.params;
    const modules = db.modules.filter((m) => m.course === cid);
    res.json(modules);
  });
}
