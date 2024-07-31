import mongoose from 'mongoose';
const courseSchema = new mongoose.Schema(
  {
    number: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    image: String,
    startDate: String,
    endDate: String,
    department: String,
    credits: String,
    description: String,
  },
  { collection: 'courses' }
);
export default courseSchema;
