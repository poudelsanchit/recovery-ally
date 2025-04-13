import { PatientsTable } from "./patients-table";

export default function Patients() {
  return (
    <div className="p-4 flex flex-col bg-white ">
      <div className="font-medium  text-lg">Patients</div>
      <div>
        <PatientsTable />
      </div>
    </div>
  );
}
