import {
  ActionIcon,
  Container,
  Modal,
  Table,
  Text,
  UnstyledButton,
} from "@mantine/core";
import { modals } from "@mantine/modals";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { removeTestbook } from "../../../api/models/testbook";
import { DBRegistryDoc } from "../../../types/pouchDB";
import { useAllTestbooks } from "./hooks/useAllTestbooks";
import useStyles from "./styles";

export const TestbookList: React.FC = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const testbooks = useAllTestbooks();

  const handleGoTo = (testbook: DBRegistryDoc) => {
    console.log("clicked", testbook);
    navigate(`/testbook/${testbook._id}`);
  };

  const handleRemove = (testbook: DBRegistryDoc) =>
    modals.openConfirmModal({
      title: `Do you really want to delete ${testbook.name}?`,
      children: (
        <Text size="sm">
          This action can't be recovered, but you can download testbook before.
        </Text>
      ),
      labels: { confirm: "Confirm", cancel: "Cancel" },
      onCancel: () => console.log("Cancel"),
      onConfirm: () => removeTestbook(testbook._id),
    });

  return (
    <Container size="md" className={classes.home_container}>
      <h3 className={classes.table_header}>Saved testbooks</h3>
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
                  <Text size="sm">{testbook.name}</Text>
                </UnstyledButton>
              </td>
              <td>{testbook.client || ""}</td>
              <td>{testbook.created || ""}</td>
              <td>
                <ActionIcon onClick={() => handleRemove(testbook)}>
                  <MdDelete></MdDelete>
                </ActionIcon>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};
