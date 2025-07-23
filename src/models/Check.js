import mongoose from 'mongoose';

const CheckSchema = new mongoose.Schema({
  name: String,
  department: String,
  purpose: String,
  checkInTime: { type: Date, default: Date.now },
  checkOutTime: Date,
}, { timestamps: true });

export default mongoose.models.Check || mongoose.model('Check', CheckSchema);
