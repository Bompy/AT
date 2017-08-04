/******************************************************************************/

import * as Promise from "bluebird";
import * as express from "express";

import * as interfaces from "../../../../../interfaces/index";

import * as events from "../../../../../interfaces/events/components/groc-round/consumer/contributions/index";
import * as contributionsInterfaces from "../../../../../interfaces/components/groc-round/consumer/contributions/index";
import * as eventManagerInterfaces from "../../../../../interfaces/setup-config/event-manager/index";

/******************************************************************************/

class ContributionsEmitter implements contributionsInterfaces.Emitter {

  /*****************************************************************/

  readonly example = ( data: events.ExampleData ) => {

    let event: events.Example = {
      context: "GrocRound|Consumer|Contributions",
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

export default ( emitEvent: eventManagerInterfaces.Emit ): contributionsInterfaces.Emitter => {
  return new ContributionsEmitter( emitEvent );
}

/******************************************************************************/
