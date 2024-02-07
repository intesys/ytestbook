import {
  ActionIcon,
  Container,
  Group,
  Table,
  Text,
  UnstyledButton,
} from "@mantine/core";
import { useToggle } from "@mantine/hooks";
import { modals } from "@mantine/modals";
import { MdDelete, MdDownload, MdOutlineRemoveRedEye } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { DBRegistryDoc } from "../../../../../types/pouchDB";
import { useAllTestbooks } from "../../../../../hooks/useAllTestbooks";
import { notifications } from "@mantine/notifications";
import classes from "./testbookList.module.scss";
import { removeTestbook } from "../../../../../api";

export const TestbookList: React.FC = () => {
  const navigate = useNavigate();
  const testbooks = useAllTestbooks();
  const [showTestbookNames, toggle] = useToggle([true, false]);

  const handleGoTo = (testbook: DBRegistryDoc) => {
    console.log("clicked", testbook);
    navigate(`/${testbook._id}`);
  };

  const handleRemove = (testbook: DBRegistryDoc) =>
    modals.openConfirmModal({
      title: `Do you want to delete ${testbook.name}?`,
      children: (
        <Text size="sm">
          This action can't be recovered, but you can download testbook before.
        </Text>
      ),
      labels: { confirm: "Confirm", cancel: "Cancel" },
      onConfirm: () => {
        removeTestbook(testbook._id)
          .then(() =>
            notifications.show({
              id: `deleted_${testbook._id}`,
              message: `Testbook ${testbook.name} deleted`,
            }),
          )
          .catch((err) =>
            notifications.show({
              id: `error_deleting_${testbook._id}`,
              title: `Error deleting testbook ${testbook.name}`,
              message: err,
              color: "red",
            }),
          );
      },
    });

  return (
    <Container size="md">
      <Group justify="space-between">
        <h3 className={classes.table_header}>Load testbook</h3>
        <ActionIcon
          variant="subtle"
          onClick={() => toggle()}
          title="Show/hide testbooks and clients"
        >
          <MdOutlineRemoveRedEye />
        </ActionIcon>
      </Group>
      <Table
        className={classes.tableContent}
        mt={16}
        highlightOnHover
        verticalSpacing={10}
      >
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Testbook name</Table.Th>
            <Table.Th>Client</Table.Th>
            <Table.Th>Created</Table.Th>
            <Table.Th>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {testbooks?.map((testbook) => (
            <Table.Tr key={testbook.location}>
              <Table.Td>
                <UnstyledButton onClick={() => handleGoTo(testbook)}>
                  <Text size="sm">
                    {showTestbookNames ? testbook.name : "***"}
                  </Text>
                </UnstyledButton>
              </Table.Td>
              <Table.Td>
                <UnstyledButton onClick={() => handleGoTo(testbook)}>
                  <Text size="sm">
                    {showTestbookNames ? testbook.client || "" : "***"}
                  </Text>
                </UnstyledButton>
              </Table.Td>
              <Table.Td>
                <Text size="sm">{testbook.created || ""}</Text>
              </Table.Td>
              <Table.Td>
                <Group>
                  <ActionIcon variant="subtle">
                    <MdDownload title="Download" />
                  </ActionIcon>
                  <ActionIcon
                    variant="subtle"
                    title="Delete"
                    onClick={() => handleRemove(testbook)}
                  >
                    <MdDelete />
                  </ActionIcon>
                </Group>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Container>
  );
};
