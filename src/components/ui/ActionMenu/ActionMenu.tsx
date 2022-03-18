import { Menu } from "@mantine/core";
import React from "react";
import { MdDelete, MdEdit } from "react-icons/md";

interface IOwnProps {
  onEdit: () => void;
  onDelete: () => void;
}

const UseCases: React.FC<IOwnProps> = ({ onEdit, onDelete }) => {
  return (
    <Menu>
      <Menu.Item icon={<MdEdit />} onClick={() => onEdit()}>
        Edit
      </Menu.Item>
      <Menu.Item color="red" icon={<MdDelete />} onClick={() => onDelete()}>
        Delete
      </Menu.Item>
    </Menu>
  );
};

export default UseCases;
