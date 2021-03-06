/******************************************************************************/

import * as mongoose from "mongoose";

import * as mongoDB from "../../../../../../components/storage/mongodb";

import { ignoreEmpty } from "../../../preparation";

/******************************************************************************/

export interface Model extends mongoose.Document, ModelNuance { }
export interface ModelNuance extends mongoDB.Document {
  shopName: string;
  images?: string[];
  numProducts: number;
}
export type PartialModel = Partial<ModelNuance>;

/******************************************************************************/

let shopSchema = new mongoose.Schema( {

  shopName: { type: String, set: ignoreEmpty },
  images: [ String ],
  numProducts: { type: Number, min: 0, default: 0 },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }

} );

/******************************************************************************/

let MongooseModel = mongoose.model<Model>( "Shop", shopSchema );

export { MongooseModel };

/******************************************************************************/
