import { Box, Button, Flex } from "@mantine/core";
import { useState } from "react";
import classes from "./tags.module.scss";

interface IProps {
  data: string[];
}

export const Tags = ({ data }: IProps) => {
  const [isShow, setIsShow] = useState<boolean>(false);
  const renderedTags = isShow ? data : data.slice(0, 3);
  const hiddenCount = data.length - 3;

  const handleToggle = () => {
    setIsShow((prev) => !prev);
  };

  return (
    <Flex gap={5} wrap="wrap">
      {renderedTags.map((tag, index) => (
        <Box key={index} className={classes.tag}>
          {tag}
        </Box>
      ))}

      {data.length > 3 && (
        <Button className={classes.button} onClick={handleToggle}>
          {isShow ? (
            <>
               <span className={classes.totalHidden}>
                -{hiddenCount}
              </span>
              <span>less</span>
            </>
          ) : (
            <>
              <span className={classes.totalHidden}>
                +{hiddenCount}
              </span>
              <span>more</span>
            </>
          )}
        </Button>
      )}
    </Flex>
  );
};
