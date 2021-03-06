/******************************************************************************/

import * as mongoose from "mongoose";
import * as mongoDB from "../../../../../../components/storage/mongodb";

import { ignoreEmpty } from "../../../preparation";

/******************************************************************************/

export interface Model extends mongoose.Document, ModelNuance {}
export interface ModelNuance extends mongoDB.Document {
  context: string;
  identifier: string;
  tags: string[];
  data: any;
}
export type PartialModel = Partial<ModelNuance>;

/******************************************************************************/

let eventSchema = new mongoose.Schema( {

  context: { type: String, set: ignoreEmpty },
  identifier: { type: String, set: ignoreEmpty },
  tags: [ String ],
  data: mongoose.Schema.Types.Mixed,

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }

} );

/******************************************************************************/

let MongooseModel = mongoose.model<Model>( "Event", eventSchema );

export { MongooseModel };

/******************************************************************************/
