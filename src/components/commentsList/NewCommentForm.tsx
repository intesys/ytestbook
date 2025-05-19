import { Button, Flex, Select, Stack } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { useCallback, useMemo } from "react";
import { USER_ANONYMOUS } from "../../lib/constants/generic";
import { FormErrorMessages } from "../../lib/formErrors";
import { TUseProject, TUseTestCase } from "../../lib/operators/types";
import { TCommentDynamicData } from "../../types/schema";
import { RichTextarea } from "../shared/RichTextarea/RichTextarea";
import { useRichTextAreaResetUtilities } from "../shared/RichTextarea/useRichTextAreaResetUtilities";

type NewCommentFormProps = {
  createComment: TUseTestCase["createComment"];
  project: TUseProject;
  testId?: string;
  stepId?: string;
};

type CommentFormValues = {
  collaboratorId: string | null;
  content: string;
};

export const NewCommentForm = ({
  createComment,
  project,
  stepId,
  testId,
}: NewCommentFormProps) => {
  const { isToReset, reset, setAsResetted } = useRichTextAreaResetUtilities();

  const form = useForm<CommentFormValues>({
    initialValues: {
      collaboratorId: null,
      content: "",
    },
    validate: {
      collaboratorId: isNotEmpty(FormErrorMessages.required),
      content: isNotEmpty(FormErrorMessages.required),
    },
  });

  const nameOptions = useMemo(() => {
    if (project.data?.collaborators) {
      const options = project.data.collaborators.map((collaborator) => ({
        label: collaborator.name,
        value: collaborator.id,
      }));
      options.push({
        label: USER_ANONYMOUS.name,
        value: USER_ANONYMOUS.id,
      });
      return options;
    }
  }, [project.data?.collaborators]);

  const onSubmit = useCallback(
    (values: CommentFormValues) => {
      createComment(values as TCommentDynamicData, testId, stepId);
      form.reset();
      reset();
    },
    [createComment, testId, stepId, form, reset],
  );

  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <Stack>
        <Flex direction="column" gap={16}>
          <Select
            withAsterisk
            label="Author"
            data={nameOptions}
            allowDeselect
            {...form.getInputProps("collaboratorId")}
          />
        </Flex>

        <RichTextarea
          {...form.getInputProps("content")}
          resetUtilities={{ isToReset, setAsResetted }}
        />
      </Stack>
      <Flex justify="end" mt={16}>
        <Button type="submit">Submit</Button>
      </Flex>
    </form>
  );
};
