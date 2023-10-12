import { TextInput, ThemeIcon } from "@mantine/core";
import { useForm } from "@mantine/form";
import { MdAddCircle } from "react-icons/md";
import { create } from "../../../../api";
import { scaffoldUseCase } from "../../../../api/scaffolds/useCase";
import { UseCase } from "../../../../types/useCase";
import { useAddUseCaseStyles } from "./styles";

const Add = ({ action }: { action: () => void }) => {
  return (
    <ThemeIcon variant="light" style={{ cursor: "pointer" }} onClick={action}>
      <MdAddCircle />
    </ThemeIcon>
  );
};

type AddUseCase = {
  testbook?: string;
  useCases: UseCase[];
};

export const AddUseCase: React.FC<AddUseCase> = ({ testbook, useCases }) => {
  const { classes } = useAddUseCaseStyles();
  const form = useForm({
    initialValues: {
      title: "",
    },
  });

  const addUseCase = () => {
    create(
      testbook ?? "",
      {
        title: form.values.title,
        _id: `uc-${useCases.length}`,
      },
      scaffoldUseCase,
    );
    form.reset();
  };

  return (
    <form onSubmit={form.onSubmit(addUseCase)}>
      <TextInput
        className={classes.textInput}
        placeholder="Add use case"
        radius="md"
        size="md"
        rightSection={<Add action={addUseCase} />}
        {...form.getInputProps("title")}
      />
    </form>
  );
};
