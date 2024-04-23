import { Button, Container, Flex, Modal } from "@mantine/core";

export function ConfirmDeleteModal({
  opened,
  close,
  handleConfirm,
}: {
  opened: boolean;
  close: () => void;
  handleConfirm: () => void;
}) {
  return (
    <Modal
      opened={opened}
      onClose={close}
      title={"Are you sure you want to delete?"}
      centered
    >
      <Container>
        <Flex justify="end" mt={16} gap={16}>
          <Button variant="outline" onClick={close}>
            Cancel
          </Button>
          <Button onClick={handleConfirm}>Confirm</Button>
        </Flex>
      </Container>
    </Modal>
  );
}
