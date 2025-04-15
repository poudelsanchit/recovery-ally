import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Trash2, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ExerciseCombobox from "./ExerciseCombobox";
import PatientSearchMultiSelect from "./PatientSearcMultiSelect";
import { useSession } from "next-auth/react";
import { Badge } from "@/components/ui/badge";
import axios from "axios";
import { toast } from "sonner";

const exerciseSchema = z.object({
  exerciseId: z.string().optional(),
  sets: z.number().min(1, "Must be at least 1 set"),
  reps: z.number().min(1, "Must be at least 1 rep"),
  frequencyPerDay: z.number().min(1, "Must be at least 1 time/day"),
});
type Patient = {
  id: string;
  name: string;
  email: string;
};

const formSchema = z.object({
  title: z.string().min(3, "Title is required"),
  durationWeeks: z
    .number()
    .min(1, "Minimum 1 week")
    .max(52, "Too long for a rehab plan"),
  daysPerWeek: z
    .number()
    .min(1, "At least 1 day/week")
    .max(7, "Max 7 days/week"),
  startDate: z.coerce.date(),
  assignedTo: z.array(z.string()),
  isTemplate: z.boolean(),
  weeklySchedule: z.record(z.string(), z.array(exerciseSchema)),
});

type Exercise = z.infer<typeof exerciseSchema>;
type FormData = z.infer<typeof formSchema>;

export default function AddPlan() {
  const [open, onOpenChange] = useState(false);
  const { data: session } = useSession();
  const [selectedPatients, setSelectedPatients] = useState<Patient[]>([]);

  const EXERCISES = [
    { id: "ex001", name: "Straight Leg Raises" },
    { id: "ex002", name: "Quad Sets" },
    { id: "ex003", name: "Hamstring Curls" },
    { id: "ex004", name: "Heel Slides" },
    { id: "ex005", name: "Ankle Pumps" },
    { id: "ex006", name: "Mini Squats (0-30°)" },
    { id: "ex007", name: "Step-Ups" },
    { id: "ex008", name: "Wall Slides" },
    { id: "ex009", name: "Bridges" },
    { id: "ex010", name: "Calf Raises" },
  ];

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      durationWeeks: 1,
      daysPerWeek: 1,
      startDate: new Date(),
      assignedTo: [],
      isTemplate: false,
      weeklySchedule: {},
    },
  });

  const [currentDay, setCurrentDay] = React.useState("");
  const weeklySchedule = form.watch("weeklySchedule");

  const addDay = () => {
    if (!currentDay || weeklySchedule[currentDay]) return;
    form.setValue("weeklySchedule", {
      ...weeklySchedule,
      [currentDay]: [],
    });
    setCurrentDay("");
  };

  const deleteDay = (day: string) => {
    const updated = { ...weeklySchedule };
    delete updated[day];
    form.setValue("weeklySchedule", updated);
  };

  const addExerciseToDay = (day: string) => {
    const newExercise: Exercise = {
      exerciseId: "",
      sets: 1,
      reps: 1,
      frequencyPerDay: 1,
    };
    const updated = [...(weeklySchedule[day] || []), newExercise];
    form.setValue(`weeklySchedule.${day}` as const, updated);
  };

  const removeExerciseFromDay = (day: string, index: number) => {
    const updated = weeklySchedule[day]?.filter((_, i) => i !== index) || [];
    form.setValue(`weeklySchedule.${day}` as const, updated);
  };
  async function onSubmit(values: FormData) {
    try {
      const response = await axios.post(
        `/api/v1/plan/${session?.user?.userId}`,
        values
      );
      console.log(response);
      if (response.data.success) {
        onOpenChange(false);
        toast("Plan has been created.");
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    const ids = selectedPatients.map((p) => p.id);
    form.setValue("assignedTo", ids);
  }, [selectedPatients, form]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className="w-40  cursor-pointer font-semibold">
          Add Plan <Plus className="ml-2" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-3xl gap-8">
        <DialogHeader className="space-y-0">
          <DialogTitle className="text-xl ">Create a new plan</DialogTitle>
          <DialogDescription>
            Fill out the details to define your rehab plan.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              name="title"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium">Title</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Fill the title of your plan..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex  gap-4">
              <FormField
                name="durationWeeks"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Duration (weeks)</FormLabel>
                    <FormControl>
                      <Input
                        min={1}
                        max={8}
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(+e.target.value)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="daysPerWeek"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Days per Week</FormLabel>
                    <FormControl>
                      <Input
                        min={1}
                        max={7}
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(+e.target.value)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="startDate"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Start Date</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        value={field.value?.toISOString().split("T")[0]}
                        onChange={(e) =>
                          field.onChange(new Date(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              name="assignedTo"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Assigned To</FormLabel>
                  <FormControl>
                    <PatientSearchMultiSelect
                      value={selectedPatients}
                      onChange={setSelectedPatients}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className=" flex gap-2 ">
              {selectedPatients.map((data) => {
                return (
                  <Badge key={data.id} className="flex items-center gap-1">
                    {data.name}
                    <X className="h-4 w-4 cursor-pointer" />
                  </Badge>
                );
              })}
            </div>
            <FormField
              name="isTemplate"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex items-center space-x-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="!mt-0">Use as Template</FormLabel>
                </FormItem>
              )}
            />

            {/* Weekly Schedule Input */}
            <div className="border-t pt-4">
              <h3 className="text-sm font-medium mb-2">Weekly Schedule</h3>
              <div className="flex gap-2 items-center mb-4">
                <Input
                  placeholder="e.g., Monday"
                  value={currentDay}
                  onChange={(e) => setCurrentDay(e.target.value)}
                />
                <Button
                  type="button"
                  onClick={addDay}
                  variant="outline"
                  className="font-semibold cursor-pointer"
                >
                  Add Day
                </Button>
              </div>
              {Object.keys(weeklySchedule).map((day) => (
                <div
                  key={day}
                  className="border p-4 mb-4 rounded flex flex-col relative"
                >
                  <div className="flex justify-between items-center mb-2 ">
                    <div className="font-semibold">{day}</div>
                    <Button
                      variant="ghost"
                      type="button"
                      size="icon"
                      onClick={() => deleteDay(day)}
                      className="rounded-sm absolute top-2 right-2 cursor-pointer "
                    >
                      <X />
                    </Button>
                  </div>
                  {(weeklySchedule[day] || []).map((ex, i) => (
                    <div
                      key={i}
                      className="flex justify-center gap-2 items-end mb-2"
                    >
                      <div className="flex flex-col gap-1">
                        <div className="text-sm font-medium text-muted-foreground">
                          Exercise
                        </div>
                        <ExerciseCombobox
                          value={ex.exerciseId}
                          options={EXERCISES}
                          onChange={(val) => {
                            const updated = [...weeklySchedule[day]];
                            updated[i].exerciseId = val;
                            form.setValue(
                              `weeklySchedule.${day}` as const,
                              updated
                            );
                          }}
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <div className="text-sm font-medium text-muted-foreground">
                          Sets
                        </div>
                        <Input
                          placeholder="Sets"
                          type="number"
                          value={ex.sets}
                          onChange={(e) => {
                            const updated = [...weeklySchedule[day]];
                            updated[i].sets = +e.target.value;
                            form.setValue(
                              `weeklySchedule.${day}` as const,
                              updated
                            );
                          }}
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <div className="text-sm font-medium text-muted-foreground">
                          Reps
                        </div>
                        <Input
                          placeholder="Reps"
                          type="number"
                          value={ex.reps}
                          onChange={(e) => {
                            const updated = [...weeklySchedule[day]];
                            updated[i].reps = +e.target.value;
                            form.setValue(
                              `weeklySchedule.${day}` as const,
                              updated
                            );
                          }}
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <div className="text-sm font-medium text-muted-foreground">
                          Freq/Day
                        </div>
                        <Input
                          placeholder="Freq/Day"
                          type="number"
                          value={ex.frequencyPerDay}
                          onChange={(e) => {
                            const updated = [...weeklySchedule[day]];
                            updated[i].frequencyPerDay = +e.target.value;
                            form.setValue(
                              `weeklySchedule.${day}` as const,
                              updated
                            );
                          }}
                        />
                      </div>
                      <Button
                        variant="ghost"
                        type="button"
                        size="icon"
                        onClick={() => removeExerciseFromDay(day, i)}
                        className="cursor-pointer bg-red-600 rounded-sm hover:bg-red-600/90"
                      >
                        <Trash2 className="w-4 h-4 text-white" />
                      </Button>
                    </div>
                  ))}
                  <div
                    onClick={() => addExerciseToDay(day)}
                    className="cursor-pointer text-sm  flex justify-center items-center gap-1 text-neutral-600  font-semibold pt-1 mr-auto "
                  >
                    Add Exercise <Plus className="w-4 h-4 " />
                  </div>
                </div>
              ))}
            </div>

            <Button type="submit">Submit Plan</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
