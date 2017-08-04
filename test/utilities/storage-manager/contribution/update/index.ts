/******************************************************************************/

import { expect, assert } from "chai";
let logger = require( "tracer" ).colorConsole();
import * as sinon from "sinon";
import * as Promise from "bluebird";

let mongoose = require( "mongoose" );
mongoose.Promise = Promise;

import storageContributionFactory from "../../../../../src/utilities/storage-manager/mongodb/contribution/index";
import dataStructuresFactory from "../../../../../src/utilities/shared-logic/basic/data-structures/index";

import * as interfaces from "../../../../../src/interfaces/index";
import { ContributionModel, ContributionMongooseModel } from "../../../../../src/utilities/storage-manager/mongodb/contribution/model/index";

require( "../../connect-database" );
import prep from "./prep/index";

/******************************************************************************/

describe( "Contribution UPDATE", function (): void {

  this.timeout( 2000 );

  /******************************************************************************/

  let sandbox: sinon.SinonSandbox = sinon.sandbox.create();
  let emitEventSpy: sinon.SinonSpy;
  let testInstances: ContributionModel[] = [];

  let dataStructures: interfaces.utilities.sharedLogic.DataStructures;
  let storageContribution: interfaces.utilities.storageManager.StorageContribution;

  /************************************************************/

  before(( done ) => {

    prep(( testContributions: ContributionModel[] ) => {

      testContributions.forEach(( contribution: ContributionModel ) => {
        testInstances.push( contribution );
      } );

      dataStructures = dataStructuresFactory( sandbox.spy() );

    } );

  } );

  /************************************************************/

  beforeEach(() => {
    emitEventSpy = sandbox.spy();
    storageContribution = storageContributionFactory( emitEventSpy, dataStructures.mapDetails );
  } );

  afterEach(() => {
    sandbox.restore();
  } );

  /************************************************************/

  it( "should update documents based on set conditions", () => {

    let allocatedId = mongoose.Types.ObjectId();

    return storageContribution.update( {
      code: testInstances[ 0 ].contributionDetails.code
    }, {
        allocatedTo: allocatedId
      } )
      .then(( updateDocuments: ContributionModel[] ) => {

        expect( updateDocuments ).to.satisfy(( contributions: ContributionModel[] ) => {

          if ( !contributions || !contributions.length ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          let culprits = contributions.filter(( contribution: ContributionModel ) => {
            return ( String( contribution.allocatedTo ) !== String( allocatedId ) );
          } );

          if ( culprits && culprits.length ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          return true;

        } );

      } );

  } );

  /************************************************************/

  it( "should emit event upon updating matching documents", () => {

    return storageContribution.update( {
      allocated: true
    }, {
        allocated: false
      } )
      .then(( updatedDocuments: ContributionModel[] ) => {

        expect( emitEventSpy ).to.satisfy(( emitEventSpy: sinon.SinonSpy ) => {

          let emittedEvent: interfaces.events.utilities.storageManager.contribution.Updated;

          emittedEvent = emitEventSpy.getCall( 0 ).args[ 0 ];

          if ( !emittedEvent ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          if ( emittedEvent.context !== "StorageContribution" ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          if ( emittedEvent.identifier !== "Updated" ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          if ( !emittedEvent.data ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          if ( !emittedEvent.data.hasOwnProperty( "conditions" ) ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          if ( !emittedEvent.data.hasOwnProperty( "document" ) ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          return true;

        } );

      } );

  } );

  /************************************************************/

  it( "should emit failed event upon erring", () => {

    return storageContribution.update( null, null, true )
      .then(( response: any ) => {

        expect( "2" ).to.eql( 3 );

      } )
      .catch(( reason: any ) => {

        sinon.assert.calledOnce( emitEventSpy );

        let emittedEvent: interfaces.events.utilities.storageManager.contribution.UpdateFailed;
        emittedEvent = emitEventSpy.getCall( 0 ).args[ 0 ];

        expect( emittedEvent ).to.satisfy(( happening: interfaces.events.utilities.storageManager.contribution.UpdateFailed ) => {

          if ( !happening ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          if ( happening.context !== "StorageContribution" ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          if ( happening.identifier !== "UpdateFailed" ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          if ( !happening.data ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          if ( !happening.data.hasOwnProperty( "conditions" ) ) {
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

  it( "should correctly structure rejection", () => {

    return storageContribution.update( null, null, true )
      .then(( response: any ) => {

        expect( "2" ).to.eql( 3 );

      } )
      .catch(( reason: any ) => {

        sinon.assert.calledOnce( emitEventSpy );

        expect( reason ).to.satisfy(( reason: any ) => {

          if ( !reason ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          if ( reason.identifier !== "UpdateFailed" ) {
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
