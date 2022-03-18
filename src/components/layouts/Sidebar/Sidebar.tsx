import React from "react";
import { Navbar, NavbarProps } from "@mantine/core";
import Primary from "../../navigation/Primary/Primary";
import { primaryMenu } from "../../../config/primaryMenu";

type OwnProps = Omit<NavbarProps, "children">;

const Sidebar: React.FC<OwnProps> = ({ ...navbarProps }) => {
  const renderMenu = () => {
    return primaryMenu.map((item, key) => <Primary item={item} key={key} />);
  };

  return (
    <Navbar p={"md"} {...navbarProps}>
      <Navbar.Section grow>{renderMenu()}</Navbar.Section>
    </Navbar>
  );
};

export default Sidebar;
