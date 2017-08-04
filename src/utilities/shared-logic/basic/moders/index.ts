/******************************************************************************/

import * as Promise from "bluebird";

import * as interfaces from "../../../../interfaces";

/******************************************************************************/

class Moders implements interfaces.utilities.sharedLogic.Moders {

  /*****************************************************************/

  constructor() {}

  /*****************************************************************/

  readonly checkThrow = ( forceThrow: boolean ) => {
    return new Promise<any>(( resolve, reject ) => {
      if ( forceThrow ) {
        throw new Error( "Forced Throw!" );
      }
      resolve();
    } );
  }

  /*****************************************************************/

}

/******************************************************************************/

export default (): interfaces.utilities.sharedLogic.Moders => {
  return new Moders();
}

/******************************************************************************/
