/******************************************************************************/

import { expect, assert } from "chai";
let logger = require( "tracer" ).colorConsole();
import * as sinon from "sinon";
import * as Promise from "bluebird";
let mongoose = require( "mongoose" );
mongoose.Promise = Promise;

import storageProductFactory from "../../../../../src/utilities/storage-manager/mongodb/product/index";
import dataStructuresFactory from "../../../../../src/utilities/shared-logic/basic/data-structures/index";

import * as interfaces from "../../../../../src/interfaces/index";
import { ProductModel, ProductMongooseModel } from "../../../../../src/utilities/storage-manager/mongodb/product/model/index";

require( "../../connect-database" );
import prep from "./prep/index";

/******************************************************************************/

describe( "Product UPDATE-BY-ID", function (): void {

  this.timeout( 2000 );

  /******************************************************************************/

  let sandbox: sinon.SinonSandbox = sinon.sandbox.create();
  let emitEventSpy: sinon.SinonSpy;
  let testInstances: ProductModel[] = [];

  let dataStructures: interfaces.utilities.sharedLogic.DataStructures;
  let storageProduct: interfaces.utilities.storageManager.StorageProduct;

  /************************************************************/

  before(( done ) => {

    prep(( testProducts: ProductModel[] ) => {

      testProducts.forEach(( Product: ProductModel ) => {
        testInstances.push( Product );
      } );

      dataStructures = dataStructuresFactory( sandbox.spy() );

      done();

    } );

  } );

  /************************************************************/

  beforeEach(() => {
    emitEventSpy = sandbox.spy();
    storageProduct = storageProductFactory( emitEventSpy, dataStructures.mapDetails );
  } );

  afterEach(() => {
    sandbox.restore();
  } );

  /************************************************************/

  it( "should update document based on id", () => {

    let num = 40;

    return storageProduct.updateById( testInstances[ 0 ]._id, {
      effectivePrice : {
        shopId : testInstances[ 0 ].effectivePrice.shopId ,
        price : num
      }
    } )
      .then(( updateDocument: ProductModel ) => {

        expect( updateDocument ).to.satisfy(( Product: ProductModel ) => {

          if ( !Product ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          if ( String( Product._id ) !== String( testInstances[ 0 ]._id ) ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          if ( Product.effectivePrice.price !== num ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          return true;

        } );

      } );

  } );

  /************************************************************/

  it( "should emit event upon updating Product document", () => {

    return storageProduct.updateById( testInstances[ 1 ]._id, {
      images : [
        "rtyui" ,
        "89hbnm"
      ]
    } )
      .then(( updatedDocument: ProductModel ) => {

        sinon.assert.calledOnce( emitEventSpy );

        let emittedEvent: interfaces.events.utilities.storageManager.product.Updated;
        emittedEvent = emitEventSpy.getCall( 0 ).args[ 0 ];

        expect( emittedEvent ).to.satisfy(( happening: interfaces.events.utilities.storageManager.product.Updated ) => {

          if ( !happening ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          if ( happening.context !== "StorageProduct" ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          if ( happening.identifier !== "Updated" ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          if ( !happening.data ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          if ( !happening.data.hasOwnProperty( "id" ) ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          if ( !happening.data.hasOwnProperty( "document" ) ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          return true;

        } );

      } );

  } );

  /************************************************************/

  it( "should emit failed event upon erring", () => {

    return storageProduct.updateById( null, null, true )
      .then(( response: any ) => {

        expect( "2" ).to.eql( 3 );

      } )
      .catch(( reason: any ) => {

        sinon.assert.calledOnce( emitEventSpy );

        let emittedEvent: interfaces.events.utilities.storageManager.product.UpdateFailed;
        emittedEvent = emitEventSpy.getCall( 0 ).args[ 0 ];

        expect( emittedEvent ).to.satisfy(( happening: interfaces.events.utilities.storageManager.product.UpdateFailed ) => {

          if ( !happening ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          if ( happening.context !== "StorageProduct" ) {
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

          if ( !happening.data.hasOwnProperty( "id" ) ) {
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

    return storageProduct.updateById( null, null, true )
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