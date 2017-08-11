/******************************************************************************/

import * as mongoose from "mongoose";
import * as interfaces from "../../../../../../interfaces";
import * as mongoDB from "../../../../../../components/storage/mongodb";

import { ignoreEmpty } from "../../../preparation";

/******************************************************************************/

export interface Model extends mongoose.Document, mongoDB.Document {
  emailAddress: string;
  accessLevel: interfaces.dataModel.core.AccessLevel;
  password: string;
  resetCode?: string;

  verification: Verification;
  personalDetails?: PersonalDetails;
  contactDetails?: ContactDetails;
  residentialDetails?: ResidentialDetails;

  activeApps: interfaces.AppName[];
}
export interface Model_Partial extends Partial<Pick<Model, ModelPartial_Details_Flat>> {
  verification?: Partial<Verification>;
  personalDetails?: Partial<PersonalDetails>;
  contactDetails?: Partial<ContactDetails>;
  residentialDetails?: Partial<ResidentialDetails>;
};
type ModelPartial_Details_Flat = "emailAddress" | "accessLevel" | "password"
  | "resetCode" | "activeApps";

/******************************************************************************/

export interface Verification_Nuance extends mongoDB.Document {
  verified: boolean;
  verificationCode?: string;
  numVerAttempts: number;
}
export interface Verification extends Verification_Nuance, mongoose.Document { }

export interface PersonalDetails_Nuance extends mongoDB.Document {
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  gender: "Male" | "Female";
}
export interface PersonalDetails extends mongoose.Document, PersonalDetails_Nuance { }

export interface ContactDetails_Nuance extends mongoose.Document, mongoDB.Document {
  phoneNumbers: string[];
}
export interface ContactDetails extends mongoose.Document, ContactDetails_Nuance { }

export interface ResidentialDetails_Nuance extends mongoose.Document, mongoDB.Document {
  country: string;
  province: string;
  address: string;
}
export interface ResidentialDetails extends mongoose.Document, ResidentialDetails_Nuance { }

/******************************************************************************/

let userSchema = new mongoose.Schema( {

  emailAddress: { type: String, set: ignoreEmpty },
  accessLevel: { type: String, set: ignoreEmpty },
  password: { type: String, set: ignoreEmpty },
  resetCode: { type: String, set: ignoreEmpty },

  verification: {
    verified: { type: Boolean, default: false, set: ignoreEmpty },
    verificationCode: { type: String, set: ignoreEmpty },
    numVerAttempts: { type: Number, min: 0, default: 0, set: ignoreEmpty },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  },

  personalDetails: {
    firstName: { type: String, set: ignoreEmpty },
    lastName: { type: String, set: ignoreEmpty },
    dateOfBirth: { type: Date, default: Date.now },
    gender: { type: String, set: ignoreEmpty },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  },

  contactDetails: {
    phoneNumbers: [ String ],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  },

  residentialDetails: {
    country: { type: String, set: ignoreEmpty },
    province: { type: String, set: ignoreEmpty },
    address: { type: String, set: ignoreEmpty },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  },

  activeApps: [ String ],

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }

} );

/******************************************************************************/

let UserMongooseModel = mongoose.model<Model>( "User", userSchema );

export { UserMongooseModel };

/******************************************************************************/