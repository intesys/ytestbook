import { Box, TextInput } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { useClickOutside } from "@mantine/hooks";
import { useEffect } from "react";

type FormValues = {
  title: string;
};

type SimpleNewElementFormProps = {
  onSubmit: (title: string, isClickOutside: boolean) => Promise<void>;
  close: () => void;
  placeholder?: string;
};

export const SimpleNewElementForm = ({
  onSubmit,
  close,
  placeholder = "Enter title",
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

  const handleSubmit = async (values: FormValues) => {
    await onSubmit(values.title, false);
    form.reset();
  };
  const triggerSubmit = async (isClickOutside = true) => {
    const validateResult = form.validate();
    if (validateResult.hasErrors) {
      return;
    }

    const values = form.getValues();
    await onSubmit(values.title, isClickOutside);
    if (isClickOutside) {
      close();
    }
    form.reset();
  };

  const closeAndReset = () => {
    close();
    form.reset();
  };

  const ref = useClickOutside(triggerSubmit);

  const onBlur = () => closeAndReset();

  const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === "Tab") {
      triggerSubmit(false);
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
          placeholder={placeholder}
        />
      </form>
    </Box>
  );
};
