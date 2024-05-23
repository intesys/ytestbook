import Expand from "../../../../assets/icons/add_circle_black.svg";
import Close from "../../../../assets/icons/minus_circle.svg";

type ExpandButtonProps = {
  opened: boolean;
};

export const ExpandButton = ({ opened }: ExpandButtonProps) => {
  if (opened) {
    return <img alt="Close" src={Close} />;
  }

  return <img alt="Expand" src={Expand} />;
};
