import { Button, Table, Text, ThemeIcon, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import clsx from "clsx";
import { MouseEvent } from "react";
import { IoMdAddCircle } from "react-icons/io";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import Delete from "../../assets/icons/delete.svg";
import { TUseTest } from "../../lib/operators/types";
import { TStep } from "../../types/schema.ts";
import { openDeleteConfirmModal } from "../modals/modals.ts";
import { RelativeDate } from "../shared/relativeDate/RelativeDate.tsx";
import { SimpleNewElementForm } from "../shared/SimpleNewElementForm";
import { StatusButton } from "../statusButton/StatusButton";
import classes from "./stepsTable.module.css";

export function StepsTable({
  steps,
  createStep,
  updateStepStatus,
  removeStep,
}: {
  steps: TStep[];
  createStep: TUseTest["createStep"];
  updateStepStatus: TUseTest["updateStepStatus"];
  removeStep: TUseTest["removeStep"];
}) {
  const params = useParams();
  const [opened, { open, close }] = useDisclosure(false);
  const navigate = useNavigate();

  const createNewTest = (title: string) => {
    createStep({
      title,
    });
    close();
  };

  return (
    <>
      <Title order={4}>Steps</Title>

      {steps.length === 0 && !opened ? (
        <Text>The steps list is empty.</Text>
      ) : (
        <Table verticalSpacing={10} horizontalSpacing={20} withTableBorder>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>
                <Text fw={"bold"}>Status</Text>
              </Table.Th>
              <Table.Th>
                <Text fw={"bold"}>Title</Text>
              </Table.Th>
              <Table.Th>
                <Text fw={"bold"}>Last update</Text>
              </Table.Th>
              <Table.Th></Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {steps.map((step) => {
              const removeClickHandler = (
                event: MouseEvent<HTMLButtonElement>,
              ) => {
                event.preventDefault();
                event.stopPropagation();

                openDeleteConfirmModal(
                  "Are you sure you want to delete this step?",
                  {
                    handleConfirm: () => {
                      if (step.id) {
                        removeStep(step.id);
                      }
                    },
                  },
                );
              };

              return (
                <Table.Tr
                  className={clsx(classes.row, {
                    [classes.active]: params.stepId === step.id,
                  })}
                  key={step.id}
                  onClick={() => navigate(`step/${step.id}`, {})}
                >
                  <Table.Td>
                    <StatusButton
                      step={step}
                      updateStepStatus={updateStepStatus}
                    />
                  </Table.Td>
                  <Table.Td>
                    <Text size="sm">{step.title}</Text>
                  </Table.Td>
                  <Table.Td>
                    {step.lastUpdate ? (
                      <RelativeDate timeStamp={step.lastUpdate} />
                    ) : (
                      "—"
                    )}
                  </Table.Td>
                  <Table.Td>
                    <Button
                      variant="transparent"
                      p={0}
                      onClick={removeClickHandler}
                    >
                      <img alt="Delete step" src={Delete} />
                    </Button>
                  </Table.Td>
                </Table.Tr>
              );
            })}
            {opened && (
              <Table.Tr>
                <Table.Td colSpan={5}>
                  <SimpleNewElementForm
                    onSubmit={createNewTest}
                    close={close}
                  />
                </Table.Td>
              </Table.Tr>
            )}
          </Table.Tbody>
        </Table>
      )}
      <Button
        w={290}
        justify="space-between"
        rightSection={
          <ThemeIcon color="black" variant="transparent">
            <IoMdAddCircle size="18px" />
          </ThemeIcon>
        }
        variant="default"
        onClick={open}
      >
        Add step
      </Button>
    </>
  );
}
