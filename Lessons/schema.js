import mongoose from 'mongoose';
const lessonSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    description: String,
    module: [{ type: mongoose.Schema.Types.ObjectId, ref: 'modules' }],
  },
  { collection: 'lessons' }
);
export default lessonSchema;
