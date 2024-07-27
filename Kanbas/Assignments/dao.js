import model from './model.js';

export const createAssignment = (assignment) => {
  delete assignment._id;
  return model.create(assignment);
};

export const findAllAssignments = () => model.find();

export const findAssignmentById = (assignmentId) =>
  model.findById(assignmentId);

export const findAssignmentsByPartialName = (partialName) => {
  const regex = new RegExp(partialName, 'i');
  return model.find({
    $or: [{ name: { $regex: regex } }, { description: { $regex: regex } }],
  });
};

export const findAssignmentByCourseId = (courseId) =>
  model.findOne({ course: courseId });

export const findAssignmentByName = (name) => model.findOne({ name: name });

export const updateAssignment = (assignmentId, assignment) =>
  model.updateOne({ _id: assignmentId }, { $set: assignment });

export const deleteAssignment = (assignmentId) =>
  model.deleteOne({ _id: assignmentId });
