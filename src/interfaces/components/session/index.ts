/******************************************************************************/

import * as express from "express";
import * as Promise from "bluebird";

import * as interfaces from "../../../interfaces";
import * as events from "./events";

/******************************************************************************/

export interface Emitter {
  setCurrentUser: ( params: events.SetCurrentUserData ) => events.SetCurrentUser;
  setCurrentUserFailed: ( params: events.SetCurrentUserFailedData ) => events.SetCurrentUserFailed;
  noCurrentUser: ( params: events.NoCurrentUserData ) => events.NoCurrentUser;
  getCurrentUserFailed: ( params: events.GetCurrentUserFailedData ) => events.GetCurrentUserFailed;
  signOutFailed: ( params: events.SignOutFailedData ) => events.SignOutFailed;
}

export interface Params {
  production: boolean;
  middlewareConfiguration: express.RequestHandler;
  getUserById: interfaces.components.storage.core.user.GetById;
  emitter: Emitter;
  checkThrow: interfaces.components.sharedLogic.moders.CheckThrow;
}

export interface SetCurrentUser {
  ( signedInUser: interfaces.dataModel.core.user.Super, req: express.Request, forceThrow?: boolean ): Promise<interfaces.dataModel.core.user.Super>;
}

export interface GetCurrentUser {
  ( req: express.Request, forceThrow?: boolean ): Promise<interfaces.dataModel.core.user.Super>;
}

export interface SignOut {
  ( req: express.Request, forceThrow?: boolean ): Promise<void>;
}

/******************************************************************************/