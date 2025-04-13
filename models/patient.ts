import { Schema, Types, model } from "mongoose";
import { IUser } from "./user";
import UserModel from "./user";

export interface IPatientInfo extends Document {
  user: Types.ObjectId | IUser;
  therapist: Types.ObjectId | IUser;
  diagnosis?: string;
  treatmentPlan?: string;
  sessions?: Array<{
    date: Date;
    notes: string;
    duration: number;
  }>;
}

const sessionSchema = new Schema({
  date: { type: Date, required: true },
  notes: { type: String, required: true },
  duration: { type: Number, required: true },
});

const PatientInfoSchema = new Schema<IPatientInfo>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    therapist: { type: Schema.Types.ObjectId, ref: "User", required: true },
    diagnosis: String,
    treatmentPlan: String,
    sessions: [sessionSchema],
  },
  { timestamps: true }
);

export const PatientModel = model<IPatientInfo>("Patient", PatientInfoSchema);

// Helper to create patient with user
export async function createPatient(
  userData: Partial<IUser>,
  patientData: Partial<IPatientInfo>
) {
  const user = new UserModel({ ...userData, role: "patient" });
  await user.save();

  const patient = new PatientModel({ ...patientData, user: user._id });
  await patient.save();

  return { user, patient };
}
