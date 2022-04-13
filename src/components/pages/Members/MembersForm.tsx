import { Button, Container, Group, TextInput } from "@mantine/core";
import React from "react";
import { useForm } from "@mantine/form";
import { useMembersContext } from "../../../context/useMembersContext";
import { TMembersData } from "../../../reducer/members/types";
import "dayjs/locale/it";

import useHandleStatus from "./hooks/useHandleStatus";

interface IOwnProps {
  initialValues: TMembersData;
}

const MembersEdit: React.FC<IOwnProps> = ({ initialValues }) => {
  const { setMember } = useMembersContext();

  const form = useForm({
    initialValues,
  });

  useHandleStatus();

  return (
    <Container fluid pl={0} pr={0}>
      <form
        onSubmit={form.onSubmit((values) => {
          setMember(values);
        })}
      >
        <Group direction="column" grow>
          <TextInput
            placeholder="The member's name"
            label="Name"
            required
            {...form.getInputProps("name")}
          />
          <TextInput
            placeholder="The member's surname"
            label="Surname"
            required
            {...form.getInputProps("surname")}
          />
          <TextInput
            placeholder="The member's business role"
            label="Business role"
            {...form.getInputProps("role")}
          />
          <Button type="submit" variant="light" color={"blue"} ml={"auto"}>
            Save
          </Button>
        </Group>
      </form>
    </Container>
  );
};

export default MembersEdit;
