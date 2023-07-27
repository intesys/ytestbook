import axios, { AxiosResponse } from "axios";
import { ITestbookModel, ITestbookRequest, ITestcaseModel } from "./models";

export interface ConfigurationParameters {
  basePath?: string;
}

export class Configuration {
  constructor(private configuration: ConfigurationParameters = {}) {}

  get basePath(): string | undefined {
    return this.configuration.basePath;
  }
}

export class YTestbookApi {
  private basePath: string | undefined;

  constructor(protected configuration = new Configuration()) {
    this.basePath = configuration.basePath;
  }

  getTestbook = (): Promise<AxiosResponse<ITestbookModel[]>> => {
    console.log(this.basePath + "/testbook");
    return axios.get(this.basePath + "/testbook");
  };

  postTestbook = (testbook: ITestbookRequest): Promise<AxiosResponse<ITestbookModel>> => {
    return axios.post(this.basePath + "/testbook", { ...testbook });
  };

  getTestcase = (): Promise<AxiosResponse<ITestcaseModel[]>> => {
    return axios.get(this.basePath + "/testcase");
  };

  postTestcase = (testcase: ITestcaseModel): Promise<AxiosResponse<ITestcaseModel>> => {
    return axios.post(this.basePath + "/testcase", { ...testcase });
  };

}
