import db from '../Database/index.js';

import * as dao from './dao.js';

function AssignmentRoutes1(app) {
  const createAssignment = async (req, res) => {
    const assignment = await dao.createAssignment(req.body);
    res.json(assignment);
  };

  const deleteAssignment = async (req, res) => {
    const status = await dao.deleteAssignment(req.params.assignmentId);
    res.json(status);
  };

  const findAllAssignments = async (req, res) => {
    const { name } = req.query;

    if (name) {
      const assignments = await dao.findAssignmentsByPartialName(name);
      res.json(assignments);
      return;
    }
    
    const assignments = await dao.findAllAssignments();
    res.json(assignments);
  };

  const findAssignmentById = async (req, res) => {
    const assignment = await dao.findAssignmentById(req.params.aid);
    res.json(assignment);
  };

  const updateAssignment = async (req, res) => {
    const { assignmentId } = req.params;
    const status = await dao.updateAssignment(assignmentId, req.body);
    res.json(status);
  };

  app.post('/api/assignments', createAssignment);
  app.get('/api/assignments', findAllAssignments);
  app.get('/api/assignments/:aid', findAssignmentById);
  app.put('/api/assignments/:aid', updateAssignment);
  app.delete('/api/assignments/:aid', deleteAssignment);
}

export default function AssignmentRoutes(app) {
  app.put('/api/assignments/:aid', (req, res) => {
    const { aid } = req.params;
    const assignmentIndex = db.assignments.findIndex((a) => a._id === aid);
    db.assignments[assignmentIndex] = {
      ...db.assignments[assignmentIndex],
      ...req.body,
    };
    res.sendStatus(204);
  });

  app.delete('/api/assignments/:aid', (req, res) => {
    const { aid } = req.params;
    db.assignments = db.assignments.filter((a) => a._id !== aid);
    res.sendStatus(200);
  });

  app.post('/api/courses/:cid/assignments', (req, res) => {
    const { cid } = req.params;
    const newAssignment = {
      ...req.body,
      course: cid,
      _id: new Date().getTime().toString(),
    };
    db.assignments.push(newAssignment);
    res.send(newAssignment);
  });

  app.get('/api/courses/:cid/assignments', (req, res) => {
    const { cid } = req.params;
    const assignments = db.assignments.filter((m) => m.course === cid);
    res.json(assignments);
  });
}
