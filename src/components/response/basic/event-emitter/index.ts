/******************************************************************************/

import * as responseInterfaces from "../../../../interfaces/components/response";
import * as eventManagerInterfaces from "../../../../interfaces/setup-config/event-manager";
import * as events from "../../../../interfaces/components/response/events";

/******************************************************************************/

class ResponseEmitter implements responseInterfaces.Emitter {

  /*****************************************************************/

  readonly stringifyHtmlPacketFailed = ( params: events.StringifyHtmlPacketFailedData ) => {
    let event: events.StringifyHtmlPacketFailed = {
      context: "Response",
      tags: [],
      identifier: "StringifyHtmlPacketFailed",
      data: {
        packet: params.packet,
        reason: params.reason
      }
    };
    this.emitEvent( event );
    return event;
  }

  /*****************************************************************/

  readonly unacceptableResponseType = ( params: any ) => {
    let event: events.UnacceptableResponseType = {
      context: "Response",
      tags: [],
      identifier: "UnacceptableResponseType",
      data: {
        res: params.res,
        packet: params.packet
      }
    };
    this.emitEvent( event );
    return event;
  }

  /*****************************************************************/

  readonly sendResponseFailed = ( params: any ) => {
    let event: events.SendResponseFailed = {
      context: "Response",
      tags: [],
      identifier: "SendResponseFailed",
      data: {
        res: params.res,
        view: params.view,
        success: params.success,
        message: params.message,
        payload: ( params.payload ) ? params.payload : "",
        reason: params.reason
      }
    };
    this.emitEvent( event );
    return event;
  }

  /*****************************************************************/

  constructor( readonly emitEvent: eventManagerInterfaces.Emit ) { }

  /*****************************************************************/

}

/******************************************************************************/

export default ( emitEvent: eventManagerInterfaces.Emit ): responseInterfaces.Emitter => {
  return new ResponseEmitter( emitEvent );
}

/******************************************************************************/