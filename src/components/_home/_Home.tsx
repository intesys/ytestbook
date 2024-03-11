import Logo from "../../assets/icons/logo.svg";
import classes from "./home.module.scss";
import AddCircle from "../../assets/icons/add_circle.svg";
import FileTypeJson from "../../assets/icons/bi_filetype-json.svg";
import { TActionProps } from "./types";
import { useProjects } from "../../lib/operators/useProjects";
import { Table } from "@mantine/core";

export function _Home() {
  const projects = useProjects();
  return (
    <div className={classes.container}>
      <div className={classes.top}>
        <div className={classes.header}>
          <img src={Logo} height={78} width={78} />
        </div>
        <div className={classes.actions}>
          <Action
            title="Create a new testbook"
            label="Create a new testbook"
            icon={AddCircle}
          />
          <Action
            title="Upload an existing testbook"
            label="Drag and drop the testbook file here"
            icon={FileTypeJson}
          />
        </div>
      </div>

      <div className={classes.bottom}>
        <div>Last testbook</div>
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Title</Table.Th>
              <Table.Th>Customer</Table.Th>
              <Table.Th>Created at</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {projects.data?.map((item) => (
              <Table.Tr>
                <Table.Td>{item.name}</Table.Td>
                <Table.Td>{item.id}</Table.Td>
                <Table.Td>{item.createdAt}</Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </div>
    </div>
  );
}

function Action({ title, label, icon }: TActionProps) {
  return (
    <div className={classes.action}>
      <div className={classes.actionTitle}>{title}</div>
      <div className={classes.actionButton}>
        <div className={classes.actionButtonLabel}>
          <img src={icon} height={40} width={40} />
          <span>{label}</span>
        </div>
      </div>
    </div>
  );
}
