import {
  Avatar,
  Group,
  Text,
  Title,
  Badge,
  Divider,
  List,
  Button,
  Space,
} from "@mantine/core";
import { DateRangePicker } from "@mantine/dates";
import React, { useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { useUseCasesContext } from "../../../context/useCasesContext";
import { ENTITIES_ACTIONS } from "../../../types";

const UseCasesDetail: React.FC = () => {
  const { setUseCases } = useUseCasesContext();
  const [value] = useState<[Date | null, Date | null]>([
    new Date(2021, 11, 1),
    new Date(2021, 11, 5),
  ]);

  return (
    <div>
      <Group direction="column" spacing="xs" grow>
        <Group spacing="xs">
          <Badge size="xs">Tag 1</Badge>
          <Badge size="xs">Tag 2</Badge>
          <Badge size="xs">Tag 2</Badge>
        </Group>
        <Title order={5}>Richiesta finanziamento con SPID</Title>
        <Divider my="xs" label="Details" />
        <Text size="sm">
          Il Cliente richiede preventivo per un finanziamento. Viene prodotto il
          SECCI. Il Cliente si autentica tramite SPiD. Vengono precompilati i
          dati personali. Il Cliente fornisce i dati di occupazione. Il Cliente
          non è PEP. La validazione della carta di credito va a buon fine. La
          pratica viene firmata dal Cliente sul portale eSaw Namirial I
          controlli sulle Banche Dati vengono effettuati e non segnalano
          problemi. Non viene richiamata SCIPAFI. Viene segnalato che la pratica
          è in valutazione. L'istruttoria della pratica si conclude con esito
          pratica deliberata. il cliente verrà reindirizzato direttamente sul
          sito TIM Viene inviato il contratto al Cliente. La pratica viene
          liquidata
        </Text>
        <Divider my="xs" label="Requirements" />
        <List size="sm">
          <List.Item>Clone or download repository from GitHub</List.Item>
          <List.Item>Install dependencies with yarn</List.Item>
          <List.Item>
            To start development server run npm start command
          </List.Item>
          <List.Item>
            Run tests to make sure your changes do not break the build
          </List.Item>
          <List.Item>Submit a pull request once you are done</List.Item>
        </List>
        <Divider my="xs" label="Period" />
        <DateRangePicker value={value} disabled={true} onChange={() => {}} />
        <Divider my="xs" label="Reported by" />
        <Group>
          <Group>
            <Avatar radius="xl" />
            <Text>Alex Pezzini</Text>
          </Group>
        </Group>
        <Divider my="xs" label="Assigned to" />
        <Group>
          <Group>
            <Avatar radius="xl" />
            <Text>Alex Pezzini</Text>
          </Group>
          <Group>
            <Avatar radius="xl" />
            <Text>Alex Pezzini</Text>
          </Group>
          <Group>
            <Avatar radius="xl" />
            <Text>Alex Pezzini</Text>
          </Group>
        </Group>
      </Group>
      <Space h="xl" />
      <Group position="right">
        <Button
          variant="light"
          color={"red"}
          leftIcon={<MdDelete />}
          onClick={() =>
            setUseCases({ id: 1, action: ENTITIES_ACTIONS.DELETE })
          }
        >
          Delete
        </Button>
        <Button
          variant="light"
          color={"blue"}
          leftIcon={<MdEdit />}
          onClick={() => setUseCases({ id: 1, action: ENTITIES_ACTIONS.EDIT })}
        >
          Edit
        </Button>
      </Group>
    </div>
  );
};

export default UseCasesDetail;
