import { useForm } from "@mantine/form";
import { create } from "../../../../api/models/useCase";
import { TextInput, ThemeIcon } from "@mantine/core";
import { scaffoldUseCase } from "../../../../api/scaffolds/useCase";
import { UseCase } from "../../../../types/useCase";
import { MdAddCircle } from "react-icons/md";
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
    create(testbook ?? "", {
      ...scaffoldUseCase,
      title: form.values.title,
      _id: `uc-${useCases.length}`,
    });
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
