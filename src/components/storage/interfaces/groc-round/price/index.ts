/******************************************************************************/

import * as Promise from "bluebird";

import * as src from "../../../../../../src/interfaces";
import * as dataModel from "../../../../../data-model";
import * as storage from "../../../interfaces";
import * as eventGenerator from "../../../interfaces/events/generator";

/******************************************************************************/

export type ClassInstance = storage.Generate<FiltrationCriteria, SortCriteria, AddDetails, UpdateDetails, dataModel.grocRound.price.Super, dataModel.grocRound.price.Super[]>;
export type Events = eventGenerator.Generate<"GrocRound|Price", FiltrationCriteria, SortCriteria, AddDetails, UpdateDetails, dataModel.grocRound.price.Super[]>;

/******************************************************************************/

export interface AddDetails {
  productId: string;
  shopId: string;
  quantity: number;
  price: number;
}

/******************************************************************************/

export type UpdateDetails = Partial<{
  productId: string;
  shopId: string;
  quantity: number;
  price: number;
}>;

/******************************************************************************/

export type FiltrationCriteria = Partial<{
  productId: string;
  shopId: string;
  quantity: Partial<{ min: number; max: number; }>;
  price: Partial<{ min: number; max: number; }>;
  textSearch: string;
}>;

/******************************************************************************/

export type SortOptions = "createdAt" | "updatedAt" | "quantity" | "price";

export interface SortCriteria extends storage.BaseSortCriteria {
  criteria: SortOptions;
  order: "Ascending" | "Descending";
}

/******************************************************************************/

