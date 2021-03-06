/******************************************************************************/

import * as mongoose from "mongoose";
import * as mongoDB from "../../../../../../components/storage/mongodb";

import { ignoreEmpty } from "../../../preparation";

/******************************************************************************/

export interface Model extends mongoose.Document, ModelNuance {}
export interface ModelNuance extends mongoDB.Document {
  userId: mongoose.Types.ObjectId;
  subscription: string;
}
export type PartialModel = Partial<ModelNuance>;

/******************************************************************************/

let subscriptionSchema = new mongoose.Schema( {

  userId: mongoose.Schema.Types.ObjectId,
  subscription: { type: String, set: ignoreEmpty },
  
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }

} );

/******************************************************************************/

let MongooseModel = mongoose.model<Model>( "Subscription", subscriptionSchema );

export { MongooseModel };

/******************************************************************************/
