/******************************************************************************/

import * as Promise from "bluebird";

import * as src from "../../../../../../src/src/index";

import { AirtimeTransferModel, AirtimeTransferMongooseModel } from "../../../../../../src/components/storage/mongodb/airtime-transfer/model/index";

import fixtures from "./data/index";

let logger = require( "tracer" ).colorConsole();

/******************************************************************************/

 export default ( callback: any ) => {

  AirtimeTransferMongooseModel.remove( {}, ( err ) => {

    if ( err ) {
      logger.debug( "Prep Error: " + JSON.stringify( err ) );
      return callback( null );
    }

    AirtimeTransferMongooseModel.insertMany( fixturesFactory(), ( err: any, savedDocuments: AirtimeTransferModel[] ) => {

      if ( err ) {
        logger.debug( "Prep Error: " + JSON.stringify( err ) );
        callback( null );
      } else {
        callback( savedDocuments );
      }

    } );

  } );

}



/******************************************************************************/
