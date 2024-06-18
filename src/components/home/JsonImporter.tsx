import { Group, rem } from "@mantine/core";
import { Dropzone } from "@mantine/dropzone";
import { IconPhoto, IconUpload, IconX } from "@tabler/icons-react";
import FileTypeJson from "../../assets/icons/bi_filetype-json.svg";
import { useProjects } from "../../lib/operators/useProjects";
import { Action } from "./Action";

export const JsonImporter = () => {
  const projects = useProjects();

  return (
    <Dropzone
      onDrop={async (files) => {
        if (!files[0]) {
          return;
        }

        const reader = new FileReader();

        reader.onload = function (event) {
          if (
            event.target?.result &&
            typeof event.target?.result === "string"
          ) {
            projects.importJSON(event.target.result);
          }
        };

        reader.readAsText(files[0]);
      }}
      onReject={(files) => console.log("rejected files", files)}
      maxSize={5 * 1024 ** 2}
      multiple={false}
    >
      <Group
        justify="center"
        gap="xl"
        mih={220}
        style={{ pointerEvents: "none" }}
      >
        <Dropzone.Accept>
          <IconUpload
            style={{
              width: rem(52),
              height: rem(52),
              color: "var(--mantine-color-blue-6)",
            }}
            stroke={1.5}
          />
        </Dropzone.Accept>
        <Dropzone.Reject>
          <IconX
            style={{
              width: rem(52),
              height: rem(52),
              color: "var(--mantine-color-red-6)",
            }}
            stroke={1.5}
          />
        </Dropzone.Reject>
        <Dropzone.Idle>
          <IconPhoto
            style={{
              width: rem(52),
              height: rem(52),
              color: "var(--mantine-color-dimmed)",
            }}
            stroke={1.5}
          />
        </Dropzone.Idle>

        {/* <div>
          <Text size="xl" inline>
            Drag images here or click to select files
          </Text>
          <Text size="sm" c="dimmed" inline mt={7}>
            Attach as many files as you like, each file should not exceed 5mb
          </Text>
        </div> */}
        <Action
          title="Upload project"
          label="Drag and drop the testbook file here"
          icon={FileTypeJson}
          /**TODO: implement JSON uploader */
          action={() => console.log("placeholder")}
        />
      </Group>
    </Dropzone>
  );
};
