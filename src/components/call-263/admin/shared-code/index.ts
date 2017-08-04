/******************************************************************************/

import * as Promise from "bluebird";

import * as interfaces from "../../../../interfaces/index";
import * as eventManagerInterfaces from "../../../../interfaces/setup-config/event-manager/index";
import * as call263Interfaces from "../../../../interfaces/components/call-263/index";

/******************************************************************************/

class SharedCode implements call263Interfaces.admin.SharedCode {

  constructor( params: call263Interfaces.admin.sharedCode.Params ) {
    //params.sharedCode;
  }

}

/******************************************************************************/

export default ( config: interfaces.Config, sharedCode: call263Interfaces.SharedCode ): call263Interfaces.admin.SharedCode => {
  return new SharedCode( {
    config : config ,
    sharedCode: sharedCode
  } )
}

/******************************************************************************/

