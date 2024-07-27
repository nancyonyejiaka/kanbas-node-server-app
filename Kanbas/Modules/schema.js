import mongoose from 'mongoose';
const moduleSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    description: String,
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'courses' },
    lessons: [{ type: mongoose.Schema.Types.ObjectId, ref: 'lessons' }],
  },
  { collection: 'modules' }
);
export default moduleSchema;
