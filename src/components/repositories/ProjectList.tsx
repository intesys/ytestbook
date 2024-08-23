import { useDocument } from "@automerge/automerge-repo-react-hooks";
import { Card } from "@mantine/core";
import { useNavigate } from "react-router";
import { TDocType } from "../../types/schema";
import { Repository } from "../serversContext/types";

type ProjectListProps = {
  repo: Repository;
  repositoryId: string;
};

export const ProjectList = ({ repo, repositoryId }: ProjectListProps) => {
  const [doc] = useDocument<TDocType>(repositoryId as any);

  const navigate = useNavigate();

  return (
    <div>
      DocTitle: {doc?.title}
      Projects:{" "}
      {doc?.projects.map((p) => (
        <Card onClick={() => navigate(`/server/${repo.name}/project/${p.id}`)}>
          {p.title}
        </Card>
      ))}
    </div>
  );
};
