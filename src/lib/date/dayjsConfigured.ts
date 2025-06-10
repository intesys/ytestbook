import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import localizedFormat from "dayjs/plugin/localizedFormat";

const dayjsConfigured = dayjs;
dayjsConfigured.extend(relativeTime);
dayjsConfigured.extend(localizedFormat);

export default dayjsConfigured;
