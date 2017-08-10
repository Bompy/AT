/******************************************************************************/

import * as express from "express";
import * as Promise from "bluebird";

import * as interfaces from "../../../../interfaces";
import * as eventManagerInterfaces from "../../../../interfaces/setup-config/event-manager";
import * as consumerInterfaces from "../../../../interfaces/components/groc-round/consumer";
import * as storageManagerInterfaces from "../../../../interfaces/utilities/storage-manager";
import * as sharedLogicInterfaces from "../../../../interfaces/utilities/shared-logic";

import emitterFactory from "./event-emitter";

/******************************************************************************/

class User implements consumerInterfaces.User {

  constructor(
    private readonly emitter: consumerInterfaces.user.Emitter,
    private readonly checkThrow: sharedLogicInterfaces.moders.CheckThrow,

    private readonly updateUserById: storageManagerInterfaces.core.user.UpdateById
  ) { }

  join = ( userId: string, forceThrow?: boolean ): Promise<void> => { }

}

/******************************************************************************/

export default ( params: {
  emitEvent: eventManagerInterfaces.Emit,
  checkThrow: sharedLogicInterfaces.moders.CheckThrow,
  updateUserById: storageManagerInterfaces.core.user.UpdateById
} ): consumerInterfaces.User => {
  return new User(
    emitterFactory( params.emitEvent ),
    params.checkThrow,
    params.updateUserById
  );
}

/******************************************************************************/