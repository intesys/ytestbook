import { Loader, Table, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useNavigate } from "react-router";
import AddCircle from "../../assets/icons/add_circle.svg";
import Eye from "../../assets/icons/eye.svg";
import EyeSlash from "../../assets/icons/eye-slash.svg";
import FileTypeJson from "../../assets/icons/bi_filetype-json.svg";
import Logo from "../../assets/icons/logo.svg";
import { parseTimestamp } from "../../lib/date/parseTimestamp";
import { useProjects } from "../../lib/operators/useProjects";
import { Action } from "./Action";
import { CreateTestbookModal } from "./CreateTestbookModal";
import classes from "./home.module.scss";
import { useState } from "react";

export function _Home() {
  const projects = useProjects();
  const navigate = useNavigate();
  const [opened, { open, close }] = useDisclosure(false);
  const [testsVisible, setTestsVisibility] = useState(true);
  const invisibilityPlaceholder = "************";

  const toggleTestsVisibility = () => {
    setTestsVisibility(!testsVisible);
  };

  return (
    <div className={classes.container}>
      <CreateTestbookModal opened={opened} close={close} />
      <div className={classes.top}>
        <div className={classes.header}>
          <img src={Logo} height={78} width={78} />
        </div>
        <div className={classes.actions}>
          <Action
            title="Create project"
            label="Create a new testbook"
            icon={AddCircle}
            action={open}
          />
          <Action
            title="Upload project"
            label="Drag and drop the testbook file here"
            icon={FileTypeJson}
            /**TODO: implement JSON uploader */
            action={() => console.log("placeholder")}
          />
        </div>
      </div>

      <div className={classes.bottom}>
        <div className={classes.table}>
          {projects.loading ? (
            <Loader color="blue" m={62} />
          ) : projects.data.length === 0 ? (
            <Text c={"gray"} maw={400} ta={"center"} m={62}>
              Your testbook projects list is currently empty. Create a new
              project to get started.
            </Text>
          ) : (
            <>
              <div className={classes.tableTitle}>
                <div>Last testbooks</div>
                <div>
                  <button type="button" onClick={toggleTestsVisibility}>
                    {testsVisible ? (
                      <img src={EyeSlash} height={25} width={25} />
                    ) : (
                      <img src={Eye} color="black" height={25} width={25} />
                    )}
                  </button>
                </div>
              </div>
              <Table
                verticalSpacing={10}
                horizontalSpacing={20}
                highlightOnHover
              >
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>Title</Table.Th>
                    <Table.Th>Customer</Table.Th>
                    <Table.Th>Created at</Table.Th>
                    <Table.Th>Last edit</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {projects.data.map((item) => (
                    <Table.Tr
                      key={item.id}
                      onClick={() => navigate(`/project/${item.id}`)}
                    >
                      <Table.Td>
                        {testsVisible ? item.title : invisibilityPlaceholder}
                      </Table.Td>
                      <Table.Td>
                        {testsVisible ? item.customer : invisibilityPlaceholder}
                      </Table.Td>
                      <Table.Td>{parseTimestamp(item.createdAt)}</Table.Td>

                      <Table.Td>
                        {item.lastEdit ? parseTimestamp(item.lastEdit) : "—"}
                      </Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
