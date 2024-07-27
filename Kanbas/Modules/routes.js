import db from '../Database/index.js';

import * as dao from './dao.js';

let currentModule = null;

function ModuleRoutes1(app) {
  const createModule = async (req, res) => {
    const module = await dao.createModule(req.body);
    res.json(module);
    // const { cid } = req.params;
    // const newModule = {
    //   ...req.body,
    //   course: cid,
    //   _id: new Date().getTime().toString(),
    // };
    // db.modules.push(newModule);
    // res.send(newModule);
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

  const findModuleByCourseId = async (req, res) => {
    const { id } = req.params;
    const modules = await dao.findModuleByCourseId(id);
    res.send(modules);
  };

  const findModuleById = async (req, res) => {
    const { mid } = req.params;
    const modules = await dao.findModuleById(mid);
    res.send(modules);
  };

  const updateModule = async (req, res) => {
    const { mid } = req.params;
    const module = req.body;
    const modules = await dao.updateModule(mid, module);
    res.sendStatus(204);
    // const { mid } = req.params;
    // const moduleIndex = db.modules.findIndex((m) => m._id === mid);
    // db.modules[moduleIndex] = {
    //   ...db.modules[moduleIndex],
    //   ...req.body,
    // };
    // res.sendStatus(204);
  };

  app.post('/api/courses/:id/modules', createModule);
  app.get('/api/courses/:id/modules', findModuleByCourseId);
  app.put('/api/modules/:mid', updateModule);
  app.delete('/api/modules/:mid', deleteModule);
}

export default function ModuleRoutes(app) {
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
