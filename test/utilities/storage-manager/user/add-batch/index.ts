/******************************************************************************/

import { expect , assert } from "chai";
let logger = require( "tracer" ).colorConsole();
import * as sinon from "sinon";
import * as Promise from "bluebird";
import * as bCrypt from "bcrypt-nodejs";
let mongoose = require( "mongoose" );
mongoose.Promise = Promise;

import storageUser from "../../../../../src/components/storage/mongodb/user/index";
import dataStructures from "../../../../../src/components/shared-logic/basic/data-structures/index";

import * as src from "../../../../../src/src/index";
import { UserModel } from "../../../../../src/components/storage/mongodb/user/model/index";

require( "../../connect-database" );
import prep from "./prep/index";

/******************************************************************************/

describe( "User AddDetailsD-BATCH" , function () : void {

  this.timeout( 2000 );

  /************************************************************/

  let sandbox : sinon.SinonSandbox = sinon.sandbox.create();
  let emitEventSpy : sinon.SinonSpy;

  let dataStructures : src.components.sharedLogic.DataStructures;
  let storageUser : src.components.storage.StorageUser;

  /************************************************************/

  let unHashedPassword = "function@6781";
  let hashedPassword = bCrypt.hashSync( unHashedPassword , bCrypt.genSaltSync( 10 ) );

  /************************************************************/

  before( ( done ) => {
    prep( done );
    dataStructures = dataStructuresFactory( sandbox.spy() );
  } );

  /************************************************************/

  beforeEach( () => {
    emitEventSpy = sandbox.spy();
    storageUser = storageUserFactory( emitEventSpy , dataStructures.mapDetails );
  } );

  afterEach( () => {
    sandbox.restore();
  } );

  /************************************************************/

  it( "should add a batch of new user records" , () => {

    let adminAccessLevel : dataModel.core.user.AccessLevel = "admin";
    let developerAccessLevel : dataModel.core.user.AccessLevel = "developer";
    let consumerAccessLevel : dataModel.core.user.AccessLevel = "consumer";

    let newUserBatch = [
      {
        emailAddress : "email1@gmail.com" ,
        password : hashedPassword ,
        accessLevel : adminAccessLevel
      } ,
      {
        emailAddress : "email2@gmail.com" ,
        password : hashedPassword ,
        accessLevel : developerAccessLevel
      } ,
      {
        emailAddress : "email3@gmail.com" ,
        password : hashedPassword,
        accessLevel : consumerAccessLevel
      }
    ];

    return storageUser.addBatch( newUserBatch )
      .then( ( users : UserModel[] ) => {

        expect( users ).to.satisfy( ( users : UserModel[] ) => {

           if ( !users || !users.length ) {
             logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
           }

           if ( users.length != 3 ) {
             logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
           }

           return true;

        } );

      } );

  } );

  /************************************************************/

  it( "should emit event upon adding a batch of new user documents" , () => {

    let adminAccessLevel : dataModel.core.user.AccessLevel = "admin";
    let developerAccessLevel : dataModel.core.user.AccessLevel = "developer";
    let consumerAccessLevel : dataModel.core.user.AccessLevel = "consumer";

    let newUserBatch = [
      {
        emailAddress : "email1@gmail.com" ,
        password : hashedPassword ,
        accessLevel : adminAccessLevel
      } ,
      {
        emailAddress : "email2@gmail.com" ,
        password : hashedPassword ,
        accessLevel : developerAccessLevel
      } ,
      {
        emailAddress : "email3@gmail.com" ,
        password : hashedPassword,
        accessLevel : consumerAccessLevel
      }
    ];

    return storageUser.addBatch( newUserBatch )
      .then( ( user : UserModel[] ) => {

        sinon.assert.callCount( emitEventSpy , 3 );

        expect( emitEventSpy ).to.satisfy( ( emitEventSpy : sinon.SinonSpy ) => {

          let emittedEvent : src.events.components.storage.user.Added;

          for ( let i = 0; i < 3 ; i++ ) {

            emittedEvent = emitEventSpy.getCall( i ).args[ 0 ];

            if ( !emittedEvent ) {
              logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
            }

            if ( emittedEvent.context !== "StorageUser" ) {
              logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
            }

            if ( emittedEvent.identifier !== "Added" ) {
              logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
            }

            if ( !emittedEvent.data ) {
              logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
            }

            if ( !emittedEvent.data.hasOwnProperty( "document" ) ) {
              logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
            }

          }

          return true;

        } );

      } );

  } );

  /************************************************************/

  it( "should emit failed event upon erring" , () => {

    return storageUser.addBatch( [] , true )
      .then( ( response : any ) => {

        expect( "2" ).to.eql( 3 );

      } )
      .catch( ( reason : any ) => {

        sinon.assert.calledOnce( emitEventSpy );

        let emittedEvent : src.events.components.storage.user.AddFailed;
        emittedEvent = emitEventSpy.getCall( 0 ).args[ 0 ];

        expect( emittedEvent ).to.satisfy( ( happening : src.events.components.storage.user.AddFailed ) => {

          if ( !happening ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          if ( happening.context !== "StorageUser" ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          if ( happening.identifier !== "AddFailed" ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          if ( !happening.data ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          if ( !happening.data.hasOwnProperty( "details" ) ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }
          if ( !happening.data.hasOwnProperty( "reason" ) ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          return true;

        } );

      } );

  } );

  /************************************************************/

  it( "should correctly structure rejection" , () => {

    return storageUser.addBatch( [] , true )
      .then( ( response : any ) => {

        expect( "2" ).to.eql( 3 );

      } )
      .catch( ( reason : any ) => {

        sinon.assert.calledOnce( emitEventSpy );

        expect( reason ).to.satisfy( ( reason : any ) => {

          if ( !reason ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          if ( reason.identifier !== "AddBatchFailed" ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          if ( !reason.data ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          if ( !reason.data.hasOwnProperty( "reason" ) ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          return true;

        } );

      } );

  } );

  /************************************************************/

} );

/******************************************************************************/
