import { Configuration, ConfigurationParameters } from "../generated";
import { environmentApiBasePath } from "../lib/envHelper";

export const yTestbookApiConfig: (
  configParams?: Partial<ConfigurationParameters>
) => Configuration = (configParams = {}) => {
  const { basePath } = configParams;
  return new Configuration({
    ...configParams,
    basePath: environmentApiBasePath(),
  });
};
