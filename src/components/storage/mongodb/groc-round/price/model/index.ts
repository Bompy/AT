/******************************************************************************/

import * as mongoose from "mongoose";

import * as mongoDB from "../../../../../../components/storage/mongodb";

import { ignoreEmpty } from "../../../preparation";

/******************************************************************************/

export interface Model extends ModelNuance, mongoose.Document { }
export interface ModelNuance extends mongoDB.Document {
  productId: mongoose.Types.ObjectId;
  shopId: mongoose.Types.ObjectId;
  quantity: number;
  price: number;
}

export type PartialModel = Partial<ModelNuance>;

/******************************************************************************/

let priceSchema = new mongoose.Schema( {

  productId: mongoose.Schema.Types.ObjectId,
  shopId: mongoose.Schema.Types.ObjectId,
  quantity: { type: Number, min: 0, default: 0 },
  price: { type: Number, min: 0, default: 0 },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }

} );

/******************************************************************************/

let MongooseModel = mongoose.model<Model>( "Price", priceSchema );

export { MongooseModel };

/******************************************************************************/
