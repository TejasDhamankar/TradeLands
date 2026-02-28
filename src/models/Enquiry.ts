import mongoose, { Model, Schema } from 'mongoose';

export interface IEnquiry extends mongoose.Document {
  fullName: string;
  mobile: string;
  email: string;
  city: string;
  investmentPlan: string[];
  investmentStatus: string[];
  investmentTimeline: string[];
  investmentPurpose: string[];
  preferredContactTime: string[];
  message?: string;
  createdAt: Date;
}

const EnquirySchema = new Schema<IEnquiry>(
  {
    fullName: { type: String, required: true, trim: true },
    mobile: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    city: { type: String, required: true, trim: true },
    investmentPlan: { type: [String], default: [] },
    investmentStatus: { type: [String], default: [] },
    investmentTimeline: { type: [String], default: [] },
    investmentPurpose: { type: [String], default: [] },
    preferredContactTime: { type: [String], default: [] },
    message: { type: String, default: '' },
    createdAt: { type: Date, default: Date.now },
  },
  {
    versionKey: false,
  }
);

const Enquiry =
  (mongoose.models.Enquiry as Model<IEnquiry>) ||
  mongoose.model<IEnquiry>('Enquiry', EnquirySchema);

export default Enquiry;

