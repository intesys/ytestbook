import { TMembersData } from "../../reducer/members/types";
import { TTagsData } from "../../reducer/tags/types";
import { TUseCasesData } from "../../reducer/usecases/types";

export type TFormFields = TUseCasesData | TMembersData | TTagsData;
