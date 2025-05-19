import {
  Button,
  Checkbox,
  Group,
  Table,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import clsx from "clsx";
import { MouseEvent, useCallback, useState } from "react";
import { IoMdAddCircle } from "react-icons/io";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import Delete from "../../assets/icons/delete.svg";
import { routesHelper } from "../../lib/helpers/routesHelper.ts";
import { TUseTest } from "../../lib/operators/types";
import { StatusEnum, TStep } from "../../types/schema.ts";
import { Modals, openDeleteConfirmModal } from "../modals/modals.ts";
import { BulkAddButton } from "../shared/BulkAddButton/BulkAddButton.tsx";
import { RelativeDate } from "../shared/relativeDate/RelativeDate.tsx";
import { SimpleNewElementForm } from "../shared/SimpleNewElementForm";
import { StatusButton } from "../statusButton/StatusButton";
import classes from "./stepsTable.module.css";
import { modals } from "@mantine/modals";
import { useProject } from "../../lib/operators/useProject.ts";
import { ChangeStatusFormValues } from "../modals/changeStatusModal/ChangeStatusModal.tsx";
import Edit from "../../assets/icons/edit.svg";

export function StepsTable({
  steps,
  createStep,
  updateStepStatuses,
  removeStep,
}: {
  steps: TStep[];
  createStep: TUseTest["createStep"];
  updateStepStatuses: TUseTest["updateStepStatuses"];
  removeStep: TUseTest["removeStep"];
}) {
  const params = useParams();
  const project = useProject(params.projectId);
  const [opened, { open, close }] = useDisclosure(false);
  const navigate = useNavigate();
  const [selectedSteps, setSelectedSteps] = useState<string[]>([]);

  const allChecked = selectedSteps.length === steps.length;
  const indeterminate = selectedSteps.length > 0 && !allChecked;

  const createNewStep = useCallback(
    async (title: string) => {
      createStep({
        title,
      });
    },
    [createStep],
  );

  const bulkLoadHandler = useCallback(
    (values: string[]) => {
      values.forEach((value) => {
        createNewStep(value);
      });
    },
    [createNewStep],
  );

  const handleStatusChange = (values: ChangeStatusFormValues) => {
    console.log("🚀 ~ handleStatusChange ~ values:", values);

    updateStepStatuses(
      selectedSteps,
      values.status as StatusEnum,
      values.collaboratorId,
      values.notes,
    );
  };

  const onStatusChange = () => {
    modals.openContextModal({
      modal: Modals.ChangeStatusModal,
      title: (
        <Group wrap="nowrap" gap={6}>
          Bulk update status
        </Group>
      ),
      centered: true,
      innerProps: {
        project,
        handleSubmit: handleStatusChange,
        statusChangable: true,
      },
    });
  };

  return (
    <>
      <Group justify="space-between" mb={20}>
        <Title order={4}>Steps</Title>

        {selectedSteps.length > 0 && (
          <Button
            variant="default"
            onClick={onStatusChange}
            leftSection={<img src={Edit} height={24} width={24} />}
          >
            Bulk edit
          </Button>
        )}
      </Group>

      {steps.length === 0 && !opened ? (
        <Text>The steps list is empty.</Text>
      ) : (
        <Table verticalSpacing={10} horizontalSpacing={20} withTableBorder>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>
                <Text fw={"bold"}>
                  <Checkbox
                    size="xs"
                    checked={allChecked}
                    indeterminate={indeterminate}
                    onChange={(event) => {
                      const { checked } = event.currentTarget;

                      if (checked) {
                        setSelectedSteps(steps.map((step) => step.id));
                      } else {
                        setSelectedSteps([]);
                      }
                    }}
                  />
                </Text>
              </Table.Th>
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
                        if (params.stepId ?? "" === step.id) {
                          // Close step side-panel when we are deleting the opened step
                          navigate(
                            routesHelper.testDetail(
                              params.serverName ?? "",
                              params.projectId ?? "",
                              params.caseId ?? "",
                              params.testId ?? "",
                            ),
                            {},
                          );
                        }

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
                  onClick={() =>
                    navigate(
                      routesHelper.stepDetail(
                        params.serverName ?? "",
                        params.projectId ?? "",
                        params.caseId ?? "",
                        params.testId ?? "",
                        step.id ?? "",
                      ),
                      {},
                    )
                  }
                >
                  <Table.Td>
                    <Checkbox
                      size="xs"
                      checked={selectedSteps.includes(step.id)}
                      onChange={(event) => {
                        const { checked } = event.currentTarget;

                        if (checked) {
                          setSelectedSteps((prev) => [...prev, step.id]);
                        } else {
                          setSelectedSteps((prev) =>
                            prev.filter((id) => id !== step.id),
                          );
                        }
                      }}
                    />
                  </Table.Td>
                  <Table.Td>
                    <StatusButton
                      step={step}
                      updateStepStatuses={updateStepStatuses}
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
                    onSubmit={createNewStep}
                    close={close}
                    placeholder="Enter the new Step title"
                  />
                </Table.Td>
              </Table.Tr>
            )}
          </Table.Tbody>
        </Table>
      )}
      <Group gap="md" wrap="nowrap">
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
        <BulkAddButton title="Bulk Add Steps" onBulkLoad={bulkLoadHandler} />
      </Group>
    </>
  );
}
