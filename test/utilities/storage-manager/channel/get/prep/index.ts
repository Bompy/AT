/******************************************************************************/

import * as Promise from "bluebird";

import * as interfaces from "../../../../../../src/interfaces/index";

import { ChannelModel , ChannelMongooseModel } from "../../../../../../src/utilities/storage-manager/mongodb/channel/model/index";

import fixturesFactory from "./data/index";

let logger = require( "tracer" ).colorConsole();

/******************************************************************************/

export default ( callback : any ) => {

  ChannelMongooseModel.remove( {} , ( err ) => {

    if ( err ) {
logger.debug( "Prep Error: " + JSON.stringify( err ) );
return callback( null );
    }

    ChannelMongooseModel.insertMany( fixturesFactory() , ( err : any , savedDocuments : ChannelModel[] ) => {

      if ( err ) {
        
                callback( null );
      } else {
        callback( savedDocuments );
      }

    } );

  } );

}



/******************************************************************************/