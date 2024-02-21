import React, { useState } from "react";
import { Grid } from "@mantine/core";
import { ActionPanel } from "./ui/ActionPanel/ActionPanel";
import { TestBookPanelVariant } from "../../types";
import { CreateTestBookForm } from "./ui/CreateTestBook/CreateTestBookForm";

const panels: Array<{ variant: TestBookPanelVariant; title: string }> = [
  {
    title: "Create a new Testbook",
    variant: "CREATE",
  },
  {
    title: "Upload an existing Testbook",
    variant: "UPLOAD",
  },
];

type ActivePanelState =
  | { status: "IDLE" }
  | {
      variant: TestBookPanelVariant;
      status: "ACTIVE";
    };

export const TestBookActionPanels: React.FC = () => {
  const [activePanelState, setActivePanelState] = useState<ActivePanelState>({
    status: "IDLE",
  });

  const handleCreateTestBookType = (variant: TestBookPanelVariant) => () => {
    if (variant === "CREATE") {
      setActivePanelState({
        status: "ACTIVE",
        variant: "CREATE",
      });
    } else {
      setActivePanelState({
        status: "ACTIVE",
        variant: "UPLOAD",
      });
    }
  };

  return (
    <Grid gutter={"40"} justify="center">
      {activePanelState.status === "IDLE" ? (
        panels.map((props) => (
          <Grid.Col span={{ base: 12, sm: 6 }} m="0" w="100%">
            <ActionPanel
              {...props}
              handleCreateTestBook={handleCreateTestBookType(props.variant)}
            />
          </Grid.Col>
        ))
      ) : activePanelState.variant === "CREATE" ? (
        <Grid.Col span={{ base: 12, sm: 6 }} m="0" w="100%">
          <CreateTestBookForm />
        </Grid.Col>
      ) : (
        //TODO: add respective component when ready
        <></>
      )}
    </Grid>
  );
};
