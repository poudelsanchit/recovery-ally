import { Schema, Types, model, models } from "mongoose";
interface ExerciseEntry {
  exerciseId: string; // or ObjectId if you're referencing an Exercise model
  sets: number;
  reps: number;
  frequencyPerDay: number;
}

interface WeeklySchedule {
  Monday: ExerciseEntry[];
  Tuesday: ExerciseEntry[];
  Wednesday: ExerciseEntry[];
  Thursday: ExerciseEntry[];
  Friday: ExerciseEntry[];
  Saturday: ExerciseEntry[];
  Sunday: ExerciseEntry[];
}

interface IPlan {
  _id: string;
  title: string;
  durationWeeks: number;
  daysPerWeek: number;
  weeklySchedule: WeeklySchedule;
  startDate: Date;
  assignedTo: string[]; // Array of patient IDs
  createdBy: string; // Physio ID who created the plan
  isTemplate: boolean;
  createdAt: Date;
}

// Single Exercise Entry
const exerciseEntrySchema = new Schema<ExerciseEntry>({
  exerciseId: { type: String, required: true }, // or ObjectId if referencing Exercise collection
  sets: { type: Number, required: true },
  reps: { type: Number, required: true },
  frequencyPerDay: { type: Number, required: true },
});

// Weekly Schedule with weekdays as keys
const weeklyScheduleSchema = new Schema<WeeklySchedule>({
  Monday: { type: [exerciseEntrySchema], default: [] },
  Tuesday: { type: [exerciseEntrySchema], default: [] },
  Wednesday: { type: [exerciseEntrySchema], default: [] },
  Thursday: { type: [exerciseEntrySchema], default: [] },
  Friday: { type: [exerciseEntrySchema], default: [] },
  Saturday: { type: [exerciseEntrySchema], default: [] },
  Sunday: { type: [exerciseEntrySchema], default: [] },
});

// Plan Schema for storing rehab plans
const planSchema = new Schema<IPlan>(
  {
    title: { type: String, required: true },
    durationWeeks: { type: Number, required: true },
    daysPerWeek: { type: Number, required: true },
    weeklySchedule: { type: weeklyScheduleSchema, required: true },
    startDate: { type: Date, required: true },
    assignedTo: [{ type: String }], // Array of patient IDs
    createdBy: { type: String, required: true }, // Physio ID who created the plan
    isTemplate: { type: Boolean, default: false }, // Mark if it's a reusable template
  },
  { timestamps: true }
);

// Compile into a model

export const PlanModel = models.Plan || model<IPlan>("Plan", planSchema);
