import { Box, TextInput } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { useClickOutside } from "@mantine/hooks";
import { useEffect } from "react";

type FormValues = {
  title: string;
};

type SimpleNewElementFormProps = {
  onSubmit: (title: string) => void;
  close: () => void;
};

export const SimpleNewElementForm = ({
  onSubmit,
  close,
}: SimpleNewElementFormProps) => {
  const form = useForm<FormValues>({
    initialValues: {
      title: "",
    },
    validate: {
      title: isNotEmpty(),
    },
  });

  useEffect(() => {
    return () => form.reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.reset]);

  const handleSubmit = (values: FormValues) => onSubmit(values.title);
  const triggerSubmit = () => {
    const validateResult = form.validate();
    if (!validateResult.hasErrors) {
      const values = form.getValues();
      handleSubmit(values);
    }
  };

  const closeAndReset = () => {
    close();
    form.reset();
  };

  const ref = useClickOutside(triggerSubmit);

  const onBlur = () => closeAndReset();

  const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === "Tab") {
      triggerSubmit();
    }

    if (event.key === "Escape") {
      closeAndReset();
    }
  };

  return (
    <Box ref={ref}>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          w={"100%"}
          required
          autoFocus
          {...form.getInputProps("title")}
          onBlur={onBlur}
          onKeyDown={onKeyDown}
        />
      </form>
    </Box>
  );
};
