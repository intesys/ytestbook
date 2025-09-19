import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import relativeTime from "dayjs/plugin/relativeTime";

const dayjsConfigured = dayjs;
dayjsConfigured.extend(relativeTime);
dayjsConfigured.extend(localizedFormat);

export default dayjsConfigured;
