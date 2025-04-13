"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { PatientsTable } from "./patients-table";
import { useSession } from "next-auth/react";

export interface Patient {
  _id: string;
  name: string;
  email: string;
  image?: string;
  injury: string;
  treatmentPlan: string | null;
}

export default function Patients() {
  const { data: session, status } = useSession();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log(session?.user?.userId);
    const fetchPatients = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/v1/user/${session?.user?.userId}/therapist/patients`
        );
        setPatients(res.data.patients);
      } catch (error) {
        console.error("Failed to fetch patients", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, [session, status]);
  console.log(patients);

  return (
    <div className="p-4 flex flex-col bg-white">
      <div className="font-medium text-lg mb-2">Patients</div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <PatientsTable patients={patients || []} />
      )}
    </div>
  );
}
