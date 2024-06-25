import { TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
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
  });

  useEffect(() => {
    return () => form.reset();
  }, []);

  const handleSubmit = (values: FormValues) => onSubmit(values.title);

  const onBlur = () => close();

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <TextInput
        w={"100%"}
        required
        autoFocus
        {...form.getInputProps("title")}
        onBlur={onBlur}
      />
    </form>
  );
};
