import { Text } from "@mantine/core";
import dayjsConfigured from "../../lib/date/dayjsConfigured";
import { parseTimestamp } from "../../lib/date/parseTimestamp";

type RelativeDateProps = {
  timeStamp?: number;
};

export const RelativeDate = ({ timeStamp }: RelativeDateProps) => {
  if (!timeStamp) {
    return "";
  }

  return (
    <Text title={parseTimestamp(timeStamp)}>
      {dayjsConfigured(new Date(timeStamp)).fromNow()}{" "}
    </Text>
  );
};
