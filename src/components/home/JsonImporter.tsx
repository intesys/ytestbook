import { Dropzone } from "@mantine/dropzone";
import { useNavigate } from "react-router";
import FileTypeJson from "../../assets/icons/bi_filetype-json.svg";
import { routesHelper } from "../../lib/helpers/routesHelper";
import { useProjects } from "../../lib/operators/useProjects";
import { Action } from "./Action";
import classes from "./home.module.css";

export const JsonImporter = () => {
  const projects = useProjects();

  const navigate = useNavigate();

  return (
    <Dropzone
      onDrop={async (files) => {
        if (!files[0]) {
          return;
        }

        const reader = new FileReader();

        reader.onload = function (event) {
          const projectId = projects.importJSON(event.target?.result);

          if (projectId) {
            navigate(routesHelper.projectDetail(projectId));
          }
        };

        reader.readAsText(files[0]);
      }}
      multiple={false}
      className={classes.jsonImporter}
    >
      <Action
        title="Upload project"
        label="Drag and drop the testbook file here"
        icon={FileTypeJson}
        action={() => ""}
      />
    </Dropzone>
  );
};
