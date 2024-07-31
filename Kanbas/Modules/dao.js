import model from './model.js';

export const createModule = (module) => {
  delete module._id;
  return model.create(module);
};

export const findAllModules = () => model.find();

export const findModuleById = (moduleId) => model.findById(moduleId);

export const findModulesByPartialName = (partialName) => {
  const regex = new RegExp(partialName, 'i');
  return model.find({
    $or: [{ name: { $regex: regex } }, { description: { $regex: regex } }],
  });
};

export const findModuleByCourseNumber = (courseNum) =>
  model.find({ course: courseNum });

export const findModuleByName = (name) => model.findOne({ name: name });

export const updateModule = (moduleId, module) =>
  model.updateOne({ _id: moduleId }, { $set: module });

export const deleteModule = (moduleId) => model.deleteOne({ _id: moduleId });
