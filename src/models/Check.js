import mongoose from 'mongoose';

const checkSchema = new mongoose.Schema({
  name: String,
  department: String,
  purpose: String,
  checkInTime: { type: Date, default: Date.now },
  checkOutTime: Date,
});

export default mongoose.models.Check || mongoose.model('Check', checkSchema);
