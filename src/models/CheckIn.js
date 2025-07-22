import mongoose from 'mongoose';

const CheckInSchema = new mongoose.Schema({
  name: String,
  department: String,
  purpose: String,
  checkInTime: { type: Date, default: Date.now },
  checkOutTime: Date,
}, { timestamps: true });

export default mongoose.models.CheckIn || mongoose.model('CheckIn', CheckInSchema);
