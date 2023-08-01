import { SelectItem } from "@mantine/core";
import _ from "lodash";
import { IBaseModel } from "../../api/models/base";

export function getSelectOptionsFromData<T extends IBaseModel>(data: T[], key: string): Array<SelectItem> {
    return _.uniq(data.map((item) => item[key] ).flat(1)).map((item) => ({ value: item, label: item }));
}