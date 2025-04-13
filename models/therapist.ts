import { Schema, Types, model } from "mongoose";
import { IUser } from "./user";
import UserModel from "./user";

export interface ITherapistInfo extends Document {
  user: Types.ObjectId | IUser;
  specialization: string;
  licenseNumber: string;
  patients: Types.ObjectId[] | IUser[];
}

const TherapistInfoSchema = new Schema<ITherapistInfo>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    specialization: { type: String, required: true },
    licenseNumber: { type: String, required: true },
    patients: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

export const TherapistModel = model<ITherapistInfo>(
  "Therapist",
  TherapistInfoSchema
);

// Helper to create therapist with user
export async function createTherapist(
  userData: Partial<IUser>,
  therapistData: Partial<ITherapistInfo>
) {
  const user = new UserModel({ ...userData, role: "therapist" });
  await user.save();

  const therapist = new TherapistModel({ ...therapistData, user: user._id });
  await therapist.save();

  return { user, therapist };
}
