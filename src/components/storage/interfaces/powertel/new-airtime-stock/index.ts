/******************************************************************************/

import * as Promise from "bluebird";

import * as src from "../../../../../../src/interfaces";
import * as dataModel from "../../../../../data-model";
import * as storage from "../../../interfaces";
import * as eventGenerator from "../../../interfaces/events/generator";

/******************************************************************************/

export type Instance = storage.ModelController<FiltrationCriteria, SortCriteria, AddDetails, UpdateDetails, dataModel.powertel.newAirtimeStock.Super>;
export type Events = eventGenerator.Methods<Context, FiltrationCriteria, SortCriteria, AddDetails, UpdateDetails, dataModel.powertel.newAirtimeStock.Super>;

/******************************************************************************/

export type Context = "Powertel|NewAirtimeStock";

/******************************************************************************/

export interface AddDetails {
  initialBalance: number;
  newBalance: number;
  amount: number;
}

/******************************************************************************/

export type UpdateDetails = Partial<{
  initialBalance: number;
  newBalance: number;
  amount: number;
}>;

/******************************************************************************/

export type FiltrationCriteria = Partial<{
  initialBalance: Partial<{ min: number; max: number; }>;
  newBalance: Partial<{ min: number; max: number; }>;
  amount: Partial<{ min: number; max: number; }>;
  textSearch: string;
}>;

/******************************************************************************/

export type SortOptions = "createdAt" | "updatedAt";

export interface SortCriteria extends storage.BaseSortCriteria {
  criteria: SortOptions;
  order: "Ascending" | "Descending";
}

/******************************************************************************/

