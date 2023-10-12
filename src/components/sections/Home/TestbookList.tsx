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
import { removeTestbook } from "../../../api/lib/testbook";
import { DBRegistryDoc } from "../../../types/pouchDB";
import { useAllTestbooks } from "../../../hooks/useAllTestbooks";
import { useTableStyles } from "./styles";
import { notifications } from "@mantine/notifications";

export const TestbookList: React.FC = () => {
  const { classes } = useTableStyles();
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
      <Group position="apart">
        <h3 className={classes.table_header}>Load testbook</h3>
        <ActionIcon
          onClick={() => toggle()}
          title="Show/hide testbooks and clients"
        >
          <MdOutlineRemoveRedEye />
        </ActionIcon>
      </Group>
      <Table
        className={classes.table_content}
        mt={16}
        highlightOnHover
        verticalSpacing={10}
      >
        <thead>
          <tr>
            <th>Testbook name</th>
            <th>Client</th>
            <th>Created</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {testbooks?.map((testbook) => (
            <tr key={testbook.location}>
              <td>
                <UnstyledButton onClick={() => handleGoTo(testbook)}>
                  <Text size="sm">
                    {showTestbookNames ? testbook.name : "***"}
                  </Text>
                </UnstyledButton>
              </td>
              <td>{showTestbookNames ? testbook.client || "" : "***"}</td>
              <td>{testbook.created || ""}</td>
              <td>
                <Group>
                  <ActionIcon>
                    <MdDownload title="Download" />
                  </ActionIcon>
                  <ActionIcon
                    title="Delete"
                    onClick={() => handleRemove(testbook)}
                  >
                    <MdDelete />
                  </ActionIcon>
                </Group>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};
