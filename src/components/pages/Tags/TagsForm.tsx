import { Button, Container, Group, TextInput } from "@mantine/core";
import React from "react";
import { useForm } from "@mantine/form";
import { useTagsContext } from "../../../context/useTagsContext";
import { TTagsData } from "../../../reducer/tags/types";
import "dayjs/locale/it";

import useHandleStatus from "./hooks/useHandleStatus";

interface IOwnProps {
  initialValues: TTagsData;
}

const TagsEdit: React.FC<IOwnProps> = ({ initialValues }) => {
  const { setTag } = useTagsContext();

  const form = useForm({
    initialValues,
  });

  useHandleStatus();

  return (
    <Container fluid pl={0} pr={0}>
      <form
        onSubmit={form.onSubmit((values) => {
          setTag(values);
        })}
      >
        <Group direction="column" grow>
          <TextInput
            placeholder="The Tag's label"
            label="Label"
            required
            {...form.getInputProps("label")}
          />
          <Button type="submit" variant="light" color={"blue"} ml={"auto"}>
            Save
          </Button>
        </Group>
      </form>
    </Container>
  );
};

export default TagsEdit;
