import { Configuration, ConfigurationParameters } from "..";
import { environmentApiBasePath } from "../../lib/envHelper";

export const yTestbookApiConfig: (
  configParams?: Partial<ConfigurationParameters>
) => Configuration = (configParams = {}) => {
  return new Configuration({
    ...configParams,
    basePath: environmentApiBasePath(),
  });
};
