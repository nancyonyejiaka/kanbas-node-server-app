import mongoose from 'mongoose';
const moduleSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    description: String,
    course: { type: String, required: true },
    lessons: [{ type: Object }],
    editing: { type: Boolean, default: false },
  },
  { collection: 'modules' }
);
export default moduleSchema;
