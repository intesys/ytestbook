import { Flex, Loader, SegmentedControl, Stack, Title } from "@mantine/core";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useProject } from "../../lib/operators/useProject";
import { ByTag } from "./partials/ByTag.tsx";
import { Plain } from "./partials/Plain.tsx";
import classes from "./reports.module.css";
import { ReportTypes, TReportTypes } from "./types.ts";

export function Reports() {
  const params = useParams();
  const project = useProject(params.projectId);
  const [reportType, setReportType] = useState<TReportTypes>(ReportTypes.Plain);

  if (project.loading) {
    return (
      <Flex align="center" justify="center" h="100dvh" w="100%">
        <Loader color="blue" size="lg" />
      </Flex>
    );
  }

  return (
    <Stack className={classes.reports}>
      <Stack className={classes.header}>
        <Title order={3}>Reports</Title>
      </Stack>

      <Stack>
        <SegmentedControl
          value={reportType}
          onChange={(value) => setReportType(value as TReportTypes)}
          data={[
            { label: "Plain", value: ReportTypes.Plain },
            { label: "By Tag", value: ReportTypes.ByTag },
          ]}
        />
      </Stack>

      <Stack>
        {reportType === ReportTypes.Plain ? (
          <Plain project={project} />
        ) : (
          <ByTag project={project} />
        )}
      </Stack>
    </Stack>
  );
}
