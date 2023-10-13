
import dayjs from "dayjs";
import { MRT_Row } from "mantine-react-table";

export const getFormattedDateDayJs = (timestamp: string | number | Date | dayjs.Dayjs | null | undefined = new Date()): string => dayjs(timestamp).format("DD/MM/YYYY HH:mm")

export function sortingByDateDayJs<T extends object>(key: keyof T) {
    return (a: MRT_Row<T>, b: MRT_Row<T>): number =>
        dayjs(a.original[key]).isAfter(dayjs(b.original[key])) ? 1 : -1
};