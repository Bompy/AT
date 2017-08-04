/******************************************************************************/

import { expect , assert } from "chai";
import * as sinon from "sinon";
import * as Promise from "bluebird";
import * as bCrypt from "bcrypt-nodejs";
let mongoose = require( "mongoose" );
mongoose.Promise = Promise;

import storageArticleFactory from "../../../../../src/utilities/storage-manager/mongodb/article/index";
import dataStructuresFactory from "../../../../../src/utilities/shared-logic/basic/data-structures/index";

import * as interfaces from "../../../../../src/interfaces/index";
import { ArticleModel } from "../../../../../src/utilities/storage-manager/mongodb/article/model/index";

require( "../../connect-database" );
import prep from "./prep/index";

let logger = require( "tracer" ).colorConsole();

/******************************************************************************/

describe( "Article ADD-BATCH" , function () : void {

  this.timeout( 2000 );

  /************************************************************/

  let sandbox : sinon.SinonSandbox = sinon.sandbox.create();
  let emitEventSpy : sinon.SinonSpy;

  let dataStructures : interfaces.utilities.sharedLogic.DataStructures;
  let storageArticle : interfaces.utilities.storageManager.StorageArticle;

  /************************************************************/

  before( ( done ) => {
    prep( done );
    dataStructures = dataStructuresFactory( sandbox.spy() );
  } );

  /************************************************************/

  beforeEach( () => {
    emitEventSpy = sandbox.spy();
    storageArticle = storageArticleFactory( emitEventSpy , dataStructures.mapDetails );
  } );

  afterEach( () => {
    sandbox.restore();
  } );

  /************************************************************/

  it( "should add a batch of new article records" , () => {

    let newArticleBatch = [
      {
        userId : mongoose.Types.ObjectId() ,
        title : "New Article Title" ,
        images : [
          "fghjk6789" ,
          "678dcd"
        ] ,
        tags : [
          "bach" ,
          "mozart" ,
          "beethoven"
        ] ,
        content : "Content goes here"
      } ,
      {
        userId : mongoose.Types.ObjectId() ,
        title : "New Article Title" ,
        images : [
          "fghjk6789" ,
          "678dcd"
        ] ,
        tags : [
          "bach" ,
          "mozart" ,
          "beethoven"
        ] ,
        content : "Content goes here"
      } ,
      {
        userId : mongoose.Types.ObjectId() ,
        title : "New Article Title" ,
        images : [
          "fghjk6789" ,
          "678dcd"
        ] ,
        tags : [
          "bach" ,
          "mozart" ,
          "beethoven"
        ] ,
        content : "Content goes here"
      }
    ];

    return storageArticle.addBatch( newArticleBatch )
      .then( ( articles : ArticleModel[] ) => {

        expect( articles ).to.satisfy( ( articles : ArticleModel[] ) => {

           if ( !articles || !articles.length ) {
             logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
           }

           if ( articles.length != 3 ) {
             logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
           }

           return true;

        } );

      } );

  } );

  /************************************************************/

  it( "should emit event upon adding a batch of new article documents" , () => {

    let newArticleBatch = [
      {
        userId : mongoose.Types.ObjectId() ,
        title : "New Article Title" ,
        images : [
          "fghjk6789" ,
          "678dcd"
        ] ,
        tags : [
          "bach" ,
          "mozart" ,
          "beethoven"
        ] ,
        content : "Content goes here"
      } ,
      {
        userId : mongoose.Types.ObjectId() ,
        title : "New Article Title" ,
        images : [
          "fghjk6789" ,
          "678dcd"
        ] ,
        tags : [
          "bach" ,
          "mozart" ,
          "beethoven"
        ] ,
        content : "Content goes here"
      } ,
      {
        userId : mongoose.Types.ObjectId() ,
        title : "New Article Title" ,
        images : [
          "fghjk6789" ,
          "678dcd"
        ] ,
        tags : [
          "bach" ,
          "mozart" ,
          "beethoven"
        ] ,
        content : "Content goes here"
      }
    ];

    return storageArticle.addBatch( newArticleBatch )
      .then( ( article : ArticleModel[] ) => {

        sinon.assert.callCount( emitEventSpy , 3 );

        expect( emitEventSpy ).to.satisfy( ( emitEventSpy : sinon.SinonSpy ) => {

          let emittedEvent : interfaces.events.utilities.storageManager.article.Added;

          for ( let i = 0; i < 3 ; i++ ) {

            emittedEvent = emitEventSpy.getCall( i ).args[ 0 ];

            if ( !emittedEvent ) {
              logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
            }

            if ( emittedEvent.context !== "StorageArticle" ) {
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

    return storageArticle.addBatch( [] , true )
      .then( ( response : any ) => {

        expect( "2" ).to.eql( 3 );

      } )
      .catch( ( reason : any ) => {

        sinon.assert.calledOnce( emitEventSpy );

        let emittedEvent : interfaces.events.utilities.storageManager.article.AddFailed;
        emittedEvent = emitEventSpy.getCall( 0 ).args[ 0 ];

        expect( emittedEvent ).to.satisfy( ( happening : interfaces.events.utilities.storageManager.article.AddFailed ) => {

          if ( !happening ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          if ( happening.context !== "StorageArticle" ) {
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

    return storageArticle.addBatch( [] , true )
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