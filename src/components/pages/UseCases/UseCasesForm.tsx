import {
  Button,
  Container,
  Group,
  MultiSelect,
  Select,
  TextInput,
} from "@mantine/core";
import { DateRangePicker } from "@mantine/dates";
import { useMediaQuery } from "@mantine/hooks";
import React from "react";
import {
  MdAccountCircle,
  MdCalendarToday,
  MdSupervisorAccount,
  MdTag,
} from "react-icons/md";
import { useForm } from "@mantine/form";
import { useUseCasesContext } from "../../../context/useCasesContext";
import { TUseCasesData } from "../../../reducer/usecases/types";
import { format } from "date-fns";
import "dayjs/locale/it";
import RichTextEditor from "@mantine/rte";

import useHandleStatus from "./hooks/useHandleStatus";

interface IOwnProps {
  initialValues: TUseCasesData;
}

const UseCasesEdit: React.FC<IOwnProps> = ({ initialValues }) => {
  const { setUseCase } = useUseCasesContext();

  const wideScreen = useMediaQuery("(min-width: 768px)");

  const form = useForm({
    initialValues,
  });

  useHandleStatus();

  return (
    <Container fluid pl={0} pr={0}>
      <form
        onSubmit={form.onSubmit((values) => {
          setUseCase(values);
        })}
      >
        <Group direction="column" grow>
          <TextInput
            placeholder="The name of the use case"
            label="Title"
            required
            {...form.getInputProps("title")}
          />
          <TextInput
            placeholder="A short description of the use case"
            label="Preview"
            {...form.getInputProps("preview")}
          />
          <Group grow direction={wideScreen ? "row" : "column"}>
            <RichTextEditor
              placeholder="The full description of the use case"
              {...form.getInputProps("description")}
              controls={[
                ["bold", "italic", "underline", "link"],
                ["unorderedList", "orderedList"],
              ]}
              sx={{
                height: "200px",
                overflow: "auto",
              }}
            />
            <RichTextEditor
              placeholder="The requirements before starts the use case"
              {...form.getInputProps("requirements")}
              controls={[
                ["bold", "italic", "underline", "link"],
                ["unorderedList", "orderedList"],
              ]}
              sx={{
                height: "200px",
                overflow: "auto",
              }}
            />
          </Group>
          <Group grow direction={wideScreen ? "row" : "column"}>
            <Select
              label="Reported by"
              placeholder="Reported by"
              searchable
              nothingFound="No options"
              data={["User 1", "User 2", "User 3"]}
              icon={<MdAccountCircle size={16} />}
              {...form.getInputProps("accountantId")}
            />
            <MultiSelect
              label="Assigned to"
              placeholder="Assigned to"
              searchable
              nothingFound="No options"
              data={["User 1", "User 2", "User 3"]}
              icon={<MdSupervisorAccount size={16} />}
              {...form.getInputProps("responsibleId")}
            />
          </Group>
          <Group grow direction={wideScreen ? "row" : "column"}>
            <DateRangePicker
              locale="it"
              label="Period"
              placeholder="Period"
              value={[
                new Date(form.values.startDate ?? ""),
                new Date(form.values.endDate ?? ""),
              ]}
              onChange={(value) => {
                form.setFieldValue(
                  "startDate",
                  format(value[0] ?? new Date(), "yyyy-MM-dd")
                );
                form.setFieldValue(
                  "endDate",
                  format(value[1] ?? new Date(), "yyyy-MM-dd")
                );
              }}
              icon={<MdCalendarToday size={16} />}
            />
            <MultiSelect
              label="Tag"
              placeholder="Tag"
              searchable
              nothingFound="No options"
              data={["Tag 1", "Tag 2", "Tag 3"]}
              icon={<MdTag size={16} />}
              {...form.getInputProps("tags")}
            />
          </Group>
          <Button type="submit" variant="light" color={"blue"} ml={"auto"}>
            Save
          </Button>
        </Group>
      </form>
    </Container>
  );
};

export default UseCasesEdit;
