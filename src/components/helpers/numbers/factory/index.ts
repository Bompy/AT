/******************************************************************************/

import * as moders from "../../moders/interfaces";

import * as interfaces from "../interfaces";
import * as events from "../events/interfaces";

/******************************************************************************/

export default (
  Numbers: interfaces.Constructor,
  events: events.ClassInstance,
  checkThrow: moders.CheckThrow
): interfaces.ClassInstance => {

  return new Numbers( events, checkThrow );

}

/******************************************************************************/
