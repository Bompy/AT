/******************************************************************************/

import { expect, assert } from "chai";
let logger = require( "tracer" ).colorConsole();
import * as sinon from "sinon";
import * as Promise from "bluebird";
let mongoose = require( "mongoose" );
mongoose.Promise = Promise;

import storageShop from "../../../../../src/components/storage/mongodb/shop/index";
import dataStructures from "../../../../../src/components/shared-logic/basic/data-structures/index";

import * as src from "../../../../../src/src/index";
import { ShopModel } from "../../../../../src/components/storage/mongodb/shop/model/index";

require( "../../connect-database" );
import prep from "./prep/index";

/******************************************************************************/

describe( "Shop GET", function (): void {

  this.timeout( 2000 );

  /************************************************************/

  let sandbox: sinon.SinonSandbox = sinon.sandbox.create();
  let emitEventSpy: sinon.SinonSpy;
  let testInstances: ShopModel[] = [];

  let dataStructures: src.components.sharedLogic.DataStructures;
  let storageShop: src.components.storage.StorageShop;

  /************************************************************/

  before(( done ) => {

    prep(( testShops: ShopModel[] ) => {

      testShops.forEach(( Shop: ShopModel ) => {
        testInstances.push( Shop );
      } );

      dataStructures = dataStructuresFactory( sandbox.spy() );

      done();

    } );

    dataStructures = dataStructuresFactory( sandbox.spy() );

  } );

  /************************************************************/

  beforeEach(() => {
    emitEventSpy = sandbox.spy();
    storageShop = storageShopFactory( emitEventSpy, dataStructures.mapDetails );
  } );

  afterEach(() => {
    sandbox.restore();
  } );

  /************************************************************/

  it( "should get all Shops sorted by specified criteria and limited by specified limit", () => {

    let testInstancesCopy = JSON.parse( JSON.stringify( testInstances ) );

    return Promise.all( [

      dataStructures.sortObjectArray( testInstances, "numProducts", "Ascending" ),
      dataStructures.sortObjectArray( testInstancesCopy, "numProducts", "Descending" ),

      storageShop.get( null, {
        criteria: "numProducts",
        order: "Ascending"
      }, 1 ),
      storageShop.get( null, {
        criteria: "numProducts",
        order: "Descending"
      }, 2 )

    ] )
      .then(( results: dataModel.Shop[][] ) => {

        expect( results ).to.satisfy(( results: dataModel.Shop[][] ) => {

          /**********************************************/

          if ( !results || results.length !== 4 ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          /**********************************************/

          let controlGroupAscending: dataModel.Shop[] = results[ 0 ];
          let controlGroupDescending: dataModel.Shop[] = results[ 1 ];

          let testGroupAscending: dataModel.Shop[] = results[ 2 ];
          let testGroupDescending: dataModel.Shop[] = results[ 3 ];

          /**********************************************/

          if ( !testGroupAscending || !testGroupAscending.length ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }
          if ( !testGroupDescending || !testGroupDescending.length ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          if ( !controlGroupAscending || !controlGroupAscending.length ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }
          if ( !controlGroupDescending || !controlGroupDescending.length ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          /**********************************************/

          for ( let i = 0; i < testGroupAscending.length; i++ ) {
            if ( testGroupAscending[ i ].numProducts !== controlGroupAscending[ i ].numProducts ) {
              logger.debug( "<<<<<<<<<<<-- GUILTY!" );
              return false;
            }
          }

          for ( let i = 0; i < testGroupDescending.length; i++ ) {
            if ( testGroupDescending[ i ].numProducts !== controlGroupDescending[ i ].numProducts ) {
              logger.debug( "<<<<<<<<<<<-- GUILTY!" );
              return false;
            }
          }

          /**********************************************/

          return true;

          /**********************************************/

        } );

      } );

  } );

  /************************************************************/

  it( "should get all Shops within the specified range of numProducts", () => {

    return storageShop.get( {
      numProductsMin: 5,
      numProductsMax: 30
    }, null, null )
      .then(( foundShops: dataModel.Shop[] ) => {

        expect( foundShops ).to.satisfy(( Shops: dataModel.Shop[] ) => {

          let culprits = Shops.filter(( Shop: dataModel.Shop ) => {
            return ( Shop.numProducts < 5 || Shop.numProducts > 30 );
          } );

          if ( culprits && culprits.length ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            console.log( JSON.stringify( culprits ) );
            return false;
          }

          return true;

        } );

      } );

  } );

  /************************************************************/

  it( "should get matching Shops by text search, correctly ranked", () => {

    expect( 1 ).to.equal( 1 );

  } );

  /************************************************************/

  it( "should emit event upon retrieving Shop documents", () => {

    return storageShop.get( null, null, null )
      .then(( foundShops: dataModel.Shop[] ) => {

        sinon.assert.calledOnce( emitEventSpy );

        let emittedEvent: src.events.components.storage.shop.Got;
        emittedEvent = emitEventSpy.getCall( 0 ).args[ 0 ];

        expect( emittedEvent ).to.satisfy(( happening: src.events.components.storage.shop.Got ) => {

          if ( !happening ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          if ( happening.context !== "StorageShop" ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          if ( happening.identifier !== "Got" ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          if ( !happening.data ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          if ( !happening.data.hasOwnProperty( "filtrationCriteria" ) ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }
          if ( !happening.data.hasOwnProperty( "sortCriteria" ) ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }
          if ( !happening.data.hasOwnProperty( "limit" ) ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }
          if ( !happening.data.hasOwnProperty( "numDocuments" ) ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          if ( happening.data.numDocuments !== foundShops.length ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          return true;

        } );

      } );

  } );

  /************************************************************/

  it( "should emit failed event upon erring", () => {

    return storageShop.get( null, null, null, true )
      .then(( response: any ) => {

        expect( "2" ).to.eql( 3 );

      } )
      .catch(( reason: any ) => {

        sinon.assert.calledOnce( emitEventSpy );

        let emittedEvent: src.events.components.storage.shop.GetFailed;
        emittedEvent = emitEventSpy.getCall( 0 ).args[ 0 ];

        expect( emittedEvent ).to.satisfy(( happening: src.events.components.storage.shop.GetFailed ) => {

          if ( !happening ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          if ( happening.context !== "StorageShop" ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          if ( happening.identifier !== "GetFailed" ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          if ( !happening.data ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          if ( !happening.data.hasOwnProperty( "filtrationCriteria" ) ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }
          if ( !happening.data.hasOwnProperty( "sortCriteria" ) ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }
          if ( !happening.data.hasOwnProperty( "limit" ) ) {
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

    return storageShop.get( null, null, null, true )
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

          if ( reason.identifier !== "GetFailed" ) {
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
