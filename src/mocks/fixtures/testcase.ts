import { StatusEnum } from "../../generated";

export const testcases = [
  {
    id: "1",
    title: "Login / User auth",
    status: StatusEnum.Done,
  },
  {
    id: "2",
    title: "Create a new patient",
    status: StatusEnum.Done,
  },
  {
    id: "3",
    title: "Search a patient",
    status: StatusEnum.Fail,
  },
  {
    id: "4",
    title: "Patient Dashboard",
    status: StatusEnum.Todo,
  },
  {
    id: "5",
    title: "Patient OPD",
    status: StatusEnum.Pending,
  },
  {
    id: "6",
    title: "Patient Therapy",
    status: StatusEnum.Blocked,
  },
  {
    id: "7",
    title: "Patient Laboratory",
    status: StatusEnum.Cancelled,
  },
  {
    id: "8",
    title: "Patient Admission/dismission",
    status: StatusEnum.Paused,
  },
  {
    id: "9",
    title: "Patient Exams",
    status: StatusEnum.Pending,
  },
  {
    id: "9",
    title: "Patient Triage",
    status: StatusEnum.Todo,
  },
];
