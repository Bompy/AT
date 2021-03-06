/******************************************************************************/

import * as Promise from "bluebird";

import * as src from "../../../../../../src/interfaces";
import * as dataModel from "../../../../../data-model";
import * as storage from "../../../interfaces";
import * as eventGenerator from "../../../interfaces/events/generator";

/******************************************************************************/

export type Instance = storage.ModelController<FiltrationCriteria, SortCriteria, AddDetails, UpdateDetails, dataModel.routers.newRouterStock.Super>;
export type Events = eventGenerator.Methods<Context, FiltrationCriteria, SortCriteria, AddDetails, UpdateDetails, dataModel.routers.newRouterStock.Super>;

/******************************************************************************/

export type Context = "Routers|NewRouterStock";

/******************************************************************************/

export interface AddDetails {
  type: string;
  initialCount: number;
  newCount: number;
  amount: number;
}

/******************************************************************************/

export type UpdateDetails = Partial<{
  type: string;
  initialCount: number;
  newCount: number;
  amount: number;
}>;

/******************************************************************************/

export type FiltrationCriteria = Partial<{
  type: string;
  initialCount: Partial<{ min: number; max: number; }>;
  newCount: Partial<{ min: number; max: number; }>;
  amount: Partial<{ min: number; max: number; }>;
  textSearch: string;
}>;

/******************************************************************************/

export type SortOptions = "createdAt" | "updatedAt" | "initialCount" | "newCount" | "amount";

export interface SortCriteria extends storage.BaseSortCriteria {
  criteria: SortOptions;
  order: "Ascending" | "Descending";
}

/******************************************************************************/

