import { useDocument } from "@automerge/automerge-repo-react-hooks";
import { Card } from "@mantine/core";
import { useNavigate } from "react-router";
import { TDocType } from "../../types/schema";
import { Repository } from "../serversContext/types";

type ProjectListProps = {
  repo: Repository;
};

export const ProjectList = ({ repo }: ProjectListProps) => {
  const [doc] = useDocument<TDocType>(repo.repositoryId as any);
  console.log("🚀 ~ ProjectList ~ doc:", repo.repositoryId, doc);

  const navigate = useNavigate();

  //   const doc = useMemo(() => {
  //     const docUrl = repositoryHandler.getServerDocUrl(repo.handler);

  //     if (!docUrl) {
  //       return undefined;
  //     }
  //     const docHandle = repo.handler.find<TDocType>(docUrl as any);

  //     return docHandle;
  //   }, []);

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
