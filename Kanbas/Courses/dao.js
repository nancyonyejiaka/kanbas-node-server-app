import model from './model.js';

export const createCourse = (course) => {
  delete course._id;
  return model.create(course);
};

export const findAllCourses = () => model.find();

export const findCourseById = (courseId) => model.findById(courseId);

export const findCoursesByPartialName = (partialName) => {
  const regex = new RegExp(partialName, 'i');
  return model.find({
    $or: [{ name: { $regex: regex } }, { description: { $regex: regex } }],
  });
};

export const findCourseByNumber = (number) => model.findOne({ number });

export const findCourseByName = (name) => model.findOne({ name: name });

export const updateCourse = (courseId, course) =>
  model.updateOne({ number: courseId }, { $set: course });

export const deleteCourse = (courseId) => model.deleteOne({ _id: courseId });
