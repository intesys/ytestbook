import { notifications } from "@mantine/notifications";
import { useNavigate, useParams } from "react-router";
import { useProjects } from "../../lib/operators/useProjects";

export function _Testbook() {
  const params = useParams();
  const navigate = useNavigate();
  const projects = useProjects();
  return (
    <div>
      {params.testbookId}
      <button
        onClick={() => {
          if (!params.testbookId) return;
          projects.remove(params.testbookId);
          notifications.show({
            id: `deleted_${params.testbookId}`,
            message: `Testbook deleted`,
          });
          navigate("/");
        }}
      >
        delete
      </button>
    </div>
  );
}
