/******************************************************************************/

import { expect, assert } from "chai";
let logger = require( "tracer" ).colorConsole();
import * as sinon from "sinon";
import * as Promise from "bluebird";
import * as bCrypt from "bcrypt-nodejs";
let mongoose = require( "mongoose" );
mongoose.Promise = Promise;

import storageShopFactory from "../../../../../src/components/storage/mongodb/shop/index";
import dataStructuresFactory from "../../../../../src/components/shared-logic/basic/data-structures/index";

import * as src from "../../../../../src/src/index";
import { ShopModel } from "../../../../../src/components/storage/mongodb/shop/model/index";

require( "../../connect-database" );
import prep from "./prep/index";

/******************************************************************************/

describe( "Shop ADD-BATCH", function (): void {

  this.timeout( 2000 );

  /************************************************************/

  let sandbox: sinon.SinonSandbox = sinon.sandbox.create();
  let emitEventSpy: sinon.SinonSpy;

  let dataStructures: src.components.sharedLogic.DataStructures;
  let storageShop: src.components.storage.StorageShop;

  /************************************************************/

  before(( done ) => {
    prep( done );
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

  it( "should add a batch of new Shop records", () => {

    let newShopBatch = [
      {
        shopName: "Bhadhella",
        images: [
          "sdfghjkl"
        ],
        numProducts: 10
      },
      {
        shopName: "Bhadhella",
        images: [
          "sdfghjkl"
        ],
        numProducts: 10
      },
      {
        shopName: "Bhadhella",
        images: [
          "sdfghjkl"
        ],
        numProducts: 10
      }
    ];

    return storageShop.addBatch( newShopBatch )
      .then(( Shops: ShopModel[] ) => {

        expect( Shops ).to.satisfy(( Shops: ShopModel[] ) => {

          if ( !Shops || !Shops.length ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          if ( Shops.length != 3 ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          return true;

        } );

      } );

  } );

  /************************************************************/

  it( "should emit event upon adding a batch of new Shop documents", () => {

    let newShopBatch = [
      {
        shopName: "Bhadhella",
        images: [
          "sdfghjkl"
        ],
        numProducts: 10
      },
      {
        shopName: "Bhadhella",
        images: [
          "sdfghjkl"
        ],
        numProducts: 10
      },
      {
        shopName: "Bhadhella",
        images: [
          "sdfghjkl"
        ],
        numProducts: 10
      }
    ];

    return storageShop.addBatch( newShopBatch )
      .then(( Shop: ShopModel[] ) => {

        sinon.assert.callCount( emitEventSpy, 3 );

        expect( emitEventSpy ).to.satisfy(( emitEventSpy: sinon.SinonSpy ) => {

          let emittedEvent: src.events.components.storage.shop.Added;

          for ( let i = 0; i < 3; i++ ) {

            emittedEvent = emitEventSpy.getCall( i ).args[ 0 ];

            if ( !emittedEvent ) {
              logger.debug( "<<<<<<<<<<<-- GUILTY!" );
              return false;
            }

            if ( emittedEvent.context !== "StorageShop" ) {
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

  it( "should emit failed event upon erring", () => {

    return storageShop.addBatch( [], true )
      .then(( response: any ) => {

        expect( "2" ).to.eql( 3 );

      } )
      .catch(( reason: any ) => {

        sinon.assert.calledOnce( emitEventSpy );

        let emittedEvent: src.events.components.storage.shop.AddFailed;
        emittedEvent = emitEventSpy.getCall( 0 ).args[ 0 ];

        expect( emittedEvent ).to.satisfy(( happening: src.events.components.storage.shop.AddFailed ) => {

          if ( !happening ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          if ( happening.context !== "StorageShop" ) {
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

  it( "should correctly structure rejection", () => {

    return storageShop.addBatch( [], true )
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
