/******************************************************************************/

import * as Promise from "bluebird";
import * as express from "express";

import * as interfaces from "../../../../../interfaces";

import * as events from "../../../../../interfaces/events/components/core/consumer/registration";
import * as registrationInterfaces from "../../../../../interfaces/components/core/consumer/registration";
import * as eventManagerInterfaces from "../../../../../interfaces/setup-config/event-manager";

/******************************************************************************/

class RegistrationEmitter implements registrationInterfaces.Emitter {

  /*****************************************************************/

  readonly example = ( data: storageManagerEvents.ExampleData ) => {

    let event: storageManagerEvents.Example = {
      context: "Core|Consumer|Registration",
      tags: [],
      identifier: "Example",
      data: {
        user: data.user
      }
    };

    this.emitEvent( event );

    return event;

  }

  /*****************************************************************/

  constructor( readonly emitEvent: eventManagerInterfaces.Emit ) {}

  /*****************************************************************/

}

/******************************************************************************/

export default ( emitEvent: eventManagerInterfaces.Emit ): registrationInterfaces.Emitter => {
  return new RegistrationEmitter( emitEvent );
}

/******************************************************************************/
