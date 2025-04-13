import { Schema, Types, model, models } from "mongoose";
import { IUser } from "./user";
import UserModel from "./user";

export interface IPatientInfo extends Document {
  user?: Types.ObjectId | IUser;
  therapist?: Types.ObjectId | IUser;
  injury?: string;
  treatmentPlan?: string;
}

const PatientInfoSchema = new Schema<IPatientInfo>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    therapist: { type: Schema.Types.ObjectId, ref: "User" },
    injury: String,
    treatmentPlan: String,
  },
  { timestamps: true }
);

export const PatientModel =
  models.Patient || model<IPatientInfo>("Patient", PatientInfoSchema);

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
