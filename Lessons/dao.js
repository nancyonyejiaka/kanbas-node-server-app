import model from './model.js';

export const createLesson = (lesson) => {
  delete lesson._id;
  return model.create(lesson);
};

export const findAllLessons = () => model.find();

export const findLessonById = (lessonId) => model.findById(lessonId);

export const findLessonsByPartialName = (partialName) => {
  const regex = new RegExp(partialName, 'i');
  return model.find({
    $or: [{ name: { $regex: regex } }, { description: { $regex: regex } }],
  });
};

export const findLessonByName = (name) => model.findOne({ name: name });

export const updateLesson = (lessonId, lesson) =>
  model.updateOne({ _id: lessonId }, { $set: lesson });

export const deleteLesson = (lessonId) => model.deleteOne({ _id: lessonId });
