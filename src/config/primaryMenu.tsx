import {
  MdOutlineArticle,
  MdOutlineEqualizer,
  MdOutlinePlayArrow,
} from "react-icons/md";
import { IMenuItem } from "../components/navigation/Primary/types";

export const primaryMenu: Array<IMenuItem> = [
  {
    label: "Plan",
    path: "",
    icon: <MdOutlineArticle style={{ width: 16, height: 16 }} />,
    children: [
      {
        label: "Use cases",
        path: "/plan/usecases",
      },
      {
        label: "Test",
        path: "/plan/test",
      },
    ],
  },
  {
    label: "Run",
    path: "/run",
    icon: <MdOutlinePlayArrow style={{ width: 16, height: 16 }} />,
  },
  {
    label: "Report",
    path: "/report",
    icon: <MdOutlineEqualizer style={{ width: 16, height: 16 }} />,
  },
];
