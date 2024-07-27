import mongoose from 'mongoose';
const assignmentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    description: String,
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'courses' },
  },
  { collection: 'assignments' }
);
export default assignmentSchema;
