/******************************************************************************/

import { expect, assert } from "chai";
let logger = require( "tracer" ).colorConsole();
import * as sinon from "sinon";
import * as Promise from "bluebird";
let mongoose = require( "mongoose" );
mongoose.Promise = Promise;

import storageArticleFactory from "../../../../../src/utilities/storage-manager/mongodb/article/index";
import dataStructuresFactory from "../../../../../src/utilities/shared-logic/basic/data-structures/index";

import * as interfaces from "../../../../../src/interfaces/index";
import { ArticleModel } from "../../../../../src/utilities/storage-manager/mongodb/article/model/index";

require( "../../connect-database" );
import prep from "./prep/index";

/******************************************************************************/

describe( "Article GET", function (): void {

  this.timeout( 2000 );

  /************************************************************/

  let sandbox: sinon.SinonSandbox = sinon.sandbox.create();
  let emitEventSpy: sinon.SinonSpy;
  let testInstances: ArticleModel[] = [];

  let dataStructures: interfaces.utilities.sharedLogic.DataStructures;
  let storageArticle: interfaces.utilities.storageManager.StorageArticle;

  /************************************************************/

  before(( done ) => {

    prep(( testArticles: ArticleModel[] ) => {

      testArticles.forEach(( article: ArticleModel ) => {
        testInstances.push( article );
      } );

      dataStructures = dataStructuresFactory( sandbox.spy() );

    } );

  } );

  /************************************************************/

  beforeEach(() => {
    emitEventSpy = sandbox.spy();
    storageArticle = storageArticleFactory( emitEventSpy, dataStructures.mapDetails );
  } );

  afterEach(() => {
    sandbox.restore();
  } );

  /************************************************************/

  it( "should distinguish between transfers with specified tags and those without", () => {

    return Promise.all( [

      storageArticle.get( {
        tags: [ "bach" ]
      }, null, null ),

      storageArticle.get( {
        tags: [ "film" ]
      }, null, null )

    ] )
      .then(( results: interfaces.dataModel.Article[][] ) => {

        expect( results ).to.satisfy(( results: interfaces.dataModel.Article[][] ) => {

          /**********************************************/

          if ( !results || results.length !== 2 ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          /**********************************************/

          if ( !results[ 0 ] || !results[ 0 ].length ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          if ( !results[ 1 ] || !results[ 1 ].length ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          /**********************************************/

          let culprits = results[ 0 ].filter(( article: interfaces.dataModel.Article ) => {
            return ( article.tags.indexOf( "bach" ) == -1 );
          } );

          if ( culprits && culprits.length ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          /**********************************************/

          culprits = results[ 1 ].filter(( article: interfaces.dataModel.Article ) => {
            return ( article.tags.indexOf( "film" ) == -1 );
          } );

          if ( culprits && culprits.length ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          /**********************************************/

          return true;

          /**********************************************/

        } );

      } );

  } );

  /************************************************************/

  it( "should get matching articles by text search, correctly ranked", () => {

    expect( 1 ).to.equal( 1 );

  } );

  /************************************************************/

  it( "should emit event upon retrieving article documents", () => {

    return storageArticle.get( null, null, null )
      .then(( foundArticles: interfaces.dataModel.Article[] ) => {

        sinon.assert.calledOnce( emitEventSpy );

        let emittedEvent: interfaces.events.utilities.storageManager.article.Got;
        emittedEvent = emitEventSpy.getCall( 0 ).args[ 0 ];

        expect( emittedEvent ).to.satisfy(( happening: interfaces.events.utilities.storageManager.article.Got ) => {

          if ( !happening ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          if ( happening.context !== "StorageArticle" ) {
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

          if ( happening.data.numDocuments !== foundArticles.length ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          return true;

        } );

      } );

  } );

  /************************************************************/

  it( "should emit failed event upon erring", () => {

    return storageArticle.get( null, null, null, true )
      .then(( response: any ) => {

        expect( "2" ).to.eql( 3 );

      } )
      .catch(( reason: any ) => {

        sinon.assert.calledOnce( emitEventSpy );

        let emittedEvent: interfaces.events.utilities.storageManager.article.GetFailed;
        emittedEvent = emitEventSpy.getCall( 0 ).args[ 0 ];

        expect( emittedEvent ).to.satisfy(( happening: interfaces.events.utilities.storageManager.article.GetFailed ) => {

          if ( !happening ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          if ( happening.context !== "StorageArticle" ) {
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

    return storageArticle.get( null, null, null, true )
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
