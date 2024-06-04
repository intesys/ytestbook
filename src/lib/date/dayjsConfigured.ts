import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

const dayjsConfigured = dayjs;
dayjsConfigured.extend(relativeTime);

export default dayjsConfigured;
