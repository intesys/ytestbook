import dayjs from "dayjs";
import { ITestcaseModel, StatusEnum } from "../api/models";


const getRandomDateDayJs = (): number => dayjs().subtract(Math.floor(Math.random() * 100), "day").valueOf();

export const testcasesDemo: ITestcaseModel[] = [
    {
      _id: "1",
      title: "Login / User auth",
      status: StatusEnum.Done,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus pronin sapien nunc accuan eget.",
      requirements:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus pronin sapien nunc accuan eget.",
      tag: [
        "Frontend",
        "Backend",
        "API",
        "UAT"      ],
      user: [
        "Mario Rossi",
        "Luigi Verdi",
        "Giovanni Bianchi",
        "Marco Neri",
      ],
      lastEditDate: getRandomDateDayJs(),
      startDate: getRandomDateDayJs(),
      endDate: getRandomDateDayJs(),
    },
    {
      _id: "2",
      title: "Create a new patient",
      status: StatusEnum.Done,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus pronin sapien nunc accuan eget.",
      requirements:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus pronin sapien nunc accuan eget.",
      tag: [
        "Frontend",
        "Backend",
        "API",
        "Demo",
      ],
      user: [
        "Mario Rossi",
        "Giovanni Bianchi",
        "Marco Neri",
      ],
      lastEditDate: getRandomDateDayJs(),
      startDate: getRandomDateDayJs(),
      endDate: getRandomDateDayJs(),
    },
    {
      _id: "3",
      title: "Search a patient",
      status: StatusEnum.Fail,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus pronin sapien nunc accuan eget.",
      requirements:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus pronin sapien nunc accuan eget.",
      tag: [
        "Frontend",
        "Backend",
        "API",
      ],
      user: [
        "Mario Rossi",
        "Luigi Verdi",
        "Giovanni Bianchi",
      ],
      lastEditDate: getRandomDateDayJs(),
      startDate: getRandomDateDayJs(),
      endDate: getRandomDateDayJs(),
    },
    {
      _id: "4",
      title: "Patient Dashboard",
      status: StatusEnum.Todo,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus pronin sapien nunc accuan eget.",
      requirements:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus pronin sapien nunc accuan eget.",
      tag: [
        "Frontend",
        "Backend",
        "API",
      ],
      user: [
        "Giovanni Bianchi",
        "Marco Neri",
      ],
      lastEditDate: getRandomDateDayJs(),
      startDate: getRandomDateDayJs(),
      endDate: getRandomDateDayJs(),
    },
    {
      _id: "5",
      title: "Patient OPD",
      status: StatusEnum.Pending,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus pronin sapien nunc accuan eget.",
      requirements:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus pronin sapien nunc accuan eget.",
      tag: [
        "Frontend",
        "Backend",
        "API",
      ],
      user: [
        "Marco Neri",
      ],
      lastEditDate: getRandomDateDayJs(),
      startDate: getRandomDateDayJs(),
      endDate: getRandomDateDayJs(),
    },
    {
      _id: "6",
      title: "Patient Therapy",
      status: StatusEnum.Blocked,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus pronin sapien nunc accuan eget.",
      requirements:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus pronin sapien nunc accuan eget.",
      tag: [
        "Frontend",
        "Backend",
        "API",
        "Demo",
        "UAT"      ],
      user: [
        "Mario Rossi",
        "Luigi Verdi",
      ],
      lastEditDate: getRandomDateDayJs(),
      startDate: getRandomDateDayJs(),
      endDate: getRandomDateDayJs(),
    },
    {
      _id: "7",
      title: "Patient Laboratory",
      status: StatusEnum.Cancelled,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus pronin sapien nunc accuan eget.",
      requirements:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus pronin sapien nunc accuan eget.",
      tag: [
        "Frontend",
        "Backend",
        "API",
      ],
      user: [
        "Mario Rossi",
        "Luigi Verdi",
        "Giovanni Bianchi",
        "Marco Neri",
      ],
      lastEditDate: getRandomDateDayJs(),
      startDate: getRandomDateDayJs(),
      endDate: getRandomDateDayJs(),
    },
    {
      _id: "8",
      title: "Patient Admission/dismission",
      status: StatusEnum.Paused,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus pronin sapien nunc accuan eget.",
      requirements:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus pronin sapien nunc accuan eget.",
      tag: [
        "Frontend",
        "Backend",
        "API",
      ],
      user: [
        "Mario Rossi",
        "Marco Neri",
      ],
      lastEditDate: getRandomDateDayJs(),
      startDate: getRandomDateDayJs(),
      endDate: getRandomDateDayJs(),
    },
    {
      _id: "9",
      title: "Patient Exams",
      status: StatusEnum.Pending,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus pronin sapien nunc accuan eget.",
      requirements:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus pronin sapien nunc accuan eget.",
      tag: [
        "Frontend",
        "Backend",
        "API",
        "UAT"      ],
      user: [
        "Mario Rossi",
        "Luigi Verdi",
        "Giovanni Bianchi",
        "Marco Neri",
      ],
      lastEditDate: getRandomDateDayJs(),
      startDate: getRandomDateDayJs(),
      endDate: getRandomDateDayJs(),
    },
    {
      _id: "9",
      title: "Patient Triage",
      status: StatusEnum.Todo,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus pronin sapien nunc accuan eget.",
      requirements:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus pronin sapien nunc accuan eget.",
      tag: [
        "Frontend",
        "Backend",
        "API",
        "UAT"      ],
      startDate: getRandomDateDayJs(),
      endDate: getRandomDateDayJs(),
    },
  ] 