/******************************************************************************/

import * as Promise from "bluebird";
import * as mongoose from "mongoose";
import MongoController from "../../mongo-controller";
import { Model, Model_Partial, CardMongooseModel } from "./model";

import * as src from "../../../../../src";
import * as storageInterfaces from "../../../../../src/components/storage";
import * as sharedLogicInterfaces from "../../../../../src/components/shared-logic";

import eventsFactory from "./events";

/******************************************************************************/

class MongoCard extends MongoController implements storageInterfaces.powertel.Card {

  /*****************************************************************/

  protected readonly events: storageInterfaces.powertel.card.Events;
  protected readonly Model: mongoose.Model<mongoose.Document>;
  protected readonly mapDetails: sharedLogicInterfaces.dataStructures.MapDetails;

  /*****************************************************************/

  constructor( params: {
    events: storageInterfaces.powertel.card.Events;
    Model: mongoose.Model<mongoose.Document>;
    mapDetails: sharedLogicInterfaces.dataStructures.MapDetails;
    checkThrow: sharedLogicInterfaces.moders.CheckThrow;
  } ) {
    super( {
      events: params.events,
      Model: params.Model,
      mapDetails: params.mapDetails,
      checkThrow: params.checkThrow
    } );
    this.events = params.events;
  }

  /*****************************************************************/

  readonly get = ( filtrationCriteria: storageInterfaces.powertel.card.FiltrationCriteria, sortCriteria: storageInterfaces.powertel.card.SortCriteria, limit: number, forceThrow = false ): Promise<dataModel.powertel.card.Super[]> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.makeConditions( filtrationCriteria );

      } )
      .then(( conditions: QueryConditions ) => {

        return this.makeSortCriteria( sortCriteria )
          .then(( sortString: string ) => {
            return Promise.resolve( {
              conditions: conditions,
              sortString: sortString
            } );
          } );

      } )
      .then(( holder: { conditions: QueryConditions, sortString: string } ) => {

        return this.find( holder.conditions, holder.sortString, limit );

      } )
      .then(( foundCards: Model[] ) => {

        return this.convertToAbstract( foundCards );

      } )
      .then(( convertedCards: dataModel.powertel.card.Super[] ) => {

        new Promise<dataModel.powertel.card.Super[]>(( resolve, reject ) => {
          this.events.got( {
            filtrationCriteria: filtrationCriteria,
            sortCriteria: sortCriteria,
            limit: limit,
            ids: convertedCards.map(( card ) => {
              return card.id;
            } )
          } );
          resolve();
        } );

        return Promise.resolve( convertedCards );

      } )
      .catch(( reason: any ) => {

        new Promise<void>(( resolve, reject ) => {
          this.events.getFailed( {
            filtrationCriteria: filtrationCriteria,
            sortCriteria: sortCriteria,
            limit: limit,
            reason: reason
          } );
          resolve();
        } );

        return Promise.reject( {
          identifier: "GetFailed",
          data: {
            reason: reason
          }
        } );

      } );

  }

  /*****************************************************************/

  readonly getById = ( cardId: string, forceThrow = false ): Promise<dataModel.powertel.card.Super> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.findById( mongoose.Types.ObjectId( cardId ) );

      } )
      .then(( foundCard: Model ) => {

        return this.convertToAbstract( [ foundCard ] );

      } )
      .then(( convertedCards: dataModel.powertel.card.Super[] ) => {

        new Promise<void>(( resolve, reject ) => {
          this.events.gotById( {
            id: cardId
          } );
        } );

        return Promise.resolve( convertedCards[ 0 ] );

      } )
      .catch(( reason: any ) => {

        new Promise<void>(( resolve, reject ) => {
          this.events.getByIdFailed( {
            id: cardId,
            reason: reason
          } );
          resolve();
        } );

        if ( reason.identifier && reason.identifier === "DocumentNotFound" ) {
          return Promise.reject( {
            identifier: "DocumentNotFound",
            data: {
              reason: reason
            }
          } );
        } else {
          return Promise.reject( {
            identifier: "GetByIdFailed",
            data: {
              reason: reason
            }
          } );
        }

      } );

  }

  /*****************************************************************/

  readonly addBatch = ( cards: storageInterfaces.powertel.card.AddDetails[], forceThrow = false ): Promise<dataModel.powertel.card.Super[]> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.saveMultipleDocuments( cards.map(( card ) => {
          let cardDetails: Model_Partial = {
            pin: card.pin,
            puk: card.puk,
            mdn: card.mdn
          };
          if ( card.buyer ) {
            cardDetails.buyer = {
              cardSaleId: mongoose.Types.ObjectId( card.buyer.cardSaleId ),
              fullName: card.buyer.fullName
            };
          }
          if ( card.user ) {
            cardDetails.user = {
              userId: mongoose.Types.ObjectId( card.user.userId ),
              emailAddress: card.user.emailAddress,
              fullName: card.user.fullName
            };
          }
          return cardDetails;
        } ) );

      } )
      .then(( addedCards: Model[] ) => {

        return this.convertToAbstract( addedCards );

      } )
      .then(( convertedCards: dataModel.powertel.card.Super[] ) => {

        new Promise<void>(( resolve, reject ) => {
          this.events.added( {
            documents: convertedCards
          } );
          resolve();
        } );

        return Promise.resolve( convertedCards );

      } )
      .catch(( reason: any ) => {

        new Promise<any>(( resolve, reject ) => {
          this.events.addFailed( {
            details: cards,
            reason: reason
          } );
          resolve();
        } );

        return Promise.reject( {
          identifier: "AddBatchFailed",
          data: {
            reason: reason
          }
        } );

      } );

  }

  /*****************************************************************/

  readonly add = ( details: storageInterfaces.powertel.card.AddDetails, forceThrow = false ): Promise<dataModel.powertel.card.Super> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        let cardDetails: Model_Partial = {
          pin: details.pin,
          puk: details.puk,
          mdn: details.mdn
        };
        if ( details.buyer ) {
          cardDetails.buyer = {
            cardSaleId: mongoose.Types.ObjectId( details.buyer.cardSaleId ),
            fullName: details.buyer.fullName
          };
        }
        if ( details.user ) {
          cardDetails.user = {
            userId: mongoose.Types.ObjectId( details.user.userId ),
            emailAddress: details.user.emailAddress,
            fullName: details.user.fullName
          };
        }

        return this.saveDocument( cardDetails );

      } )
      .then(( addedCard: Model ) => {

        return this.convertToAbstract( [ addedCard ] );

      } )
      .then(( convertedCards: dataModel.powertel.card.Super[] ) => {

        new Promise<void>(( resolve, reject ) => {
          this.events.added( {
            documents: convertedCards
          } );
          resolve();
        } );

        return Promise.resolve( convertedCards[ 0 ] );

      } )
      .catch(( reason: any ) => {

        new Promise<void>(( resolve, reject ) => {
          this.events.addFailed( {
            details: [ details ],
            reason: reason
          } );
          resolve();
        } );

        return Promise.reject( {
          identifier: "AddFailed",
          data: {
            reason: reason
          }
        } );

      } );

  }

  /*****************************************************************/

  readonly update = ( filtrationCriteria: storageInterfaces.powertel.card.FiltrationCriteria, details: storageInterfaces.powertel.card.UpdateDetails, forceThrow = false ): Promise<dataModel.powertel.card.Super[]> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.makeConditions( filtrationCriteria );

      } ).then(( conditions: QueryConditions ) => {

        return this.find( conditions, null, null );

      } )
      .then(( foundCards: Model[] ) => {

        return Promise.all( foundCards.map(( card ) => {

          return this.generateUpdateDetails( card, details )
            .then(( fedCard: Model ) => {

              return new Promise<Model>(( resolve, reject ) => {
                fedCard.save(( err: any ) => {
                  if ( err ) {
                    reject( err );
                  } else {
                    resolve( fedCard );
                  }
                } );
              } );

            } );

        } ) );

      } )
      .then(( updatedCards: Model[] ) => {

        return this.convertToAbstract( updatedCards );

      } )
      .then(( updatedCards: dataModel.powertel.card.Super[] ) => {

        new Promise<any>(( resolve, reject ) => {
          this.events.updated( {
            conditions: filtrationCriteria,
            documents: updatedCards
          } );
          resolve();
        } );

        return Promise.resolve( updatedCards );

      } )
      .catch(( reason: any ) => {

        new Promise<any>(( resolve, reject ) => {
          this.events.updateFailed( {
            conditions: filtrationCriteria,
            updates: details,
            reason: reason
          } );
          resolve();
        } );

        return Promise.reject( {
          identifier: "UpdateFailed",
          data: {
            reason: reason
          }
        } );

      } );

  }

  /*****************************************************************/

  readonly updateById = ( cardId: string, details: storageInterfaces.powertel.card.UpdateDetails, forceThrow = false ): Promise<dataModel.powertel.card.Super> => {

    let cardObjectId: mongoose.Types.ObjectId;

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.findById( mongoose.Types.ObjectId( cardId ) );

      } )
      .then(( card: Model ) => {

        return this.generateUpdateDetails( card, details )
          .then(( fedCard: Model ) => {

            return new Promise<Model>(( resolve, reject ) => {
              fedCard.save(( err: any ) => {
                if ( err ) {
                  reject( err );
                } else {
                  resolve( fedCard );
                }
              } );
            } );

          } );

      } )
      .then(( updatedCard: Model ) => {

        return this.convertToAbstract( [ updatedCard ] );

      } )
      .then(( convertedCards: dataModel.powertel.card.Super[] ) => {

        new Promise<any>(( resolve, reject ) => {
          this.events.updated( {
            id: cardId,
            documents: convertedCards
          } );
          resolve();
        } );

        return Promise.resolve( convertedCards[ 0 ] );

      } )
      .catch(( reason: any ) => {

        new Promise<any>(( resolve, reject ) => {
          this.events.updateFailed( {
            id: cardId,
            updates: details,
            reason: reason
          } );
          resolve();
        } );

        return Promise.reject( {
          identifier: "UpdateFailed",
          data: {
            reason: reason
          }
        } );

      } );

  }

  /*****************************************************************/

  readonly remove = ( filtrationCriteria: storageInterfaces.powertel.card.FiltrationCriteria, forceThrow = false ): Promise<void> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.makeConditions( filtrationCriteria );

      } )
      .then(( conditions: QueryConditions ) => {

        return this.removeDocuments( conditions );

      } )
      .then(( response: any ) => {

        new Promise<any>(( resolve, reject ) => {
          this.events.removed( {
            conditions: filtrationCriteria
          } );
          resolve();
        } );

        return Promise.resolve();

      } )
      .catch(( reason: any ) => {

        new Promise<any>(( resolve, reject ) => {
          this.events.removeFailed( {
            conditions: filtrationCriteria,
            reason: reason
          } );
          resolve();
        } );

        return Promise.reject( {
          identifier: "RemoveFailed",
          data: {
            reason: reason
          }
        } );

      } );

  }

  /*****************************************************************/

  readonly removeById = ( cardId: string, forceThrow?: boolean ): Promise<void> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.removeDocuments( {
          "_id": mongoose.Types.ObjectId( cardId )
        } );

      } )
      .then(( response: any ) => {

        new Promise<any>(( resolve, reject ) => {
          this.events.removed( {
            id: cardId
          } );
          resolve();
        } );

        return Promise.resolve();

      } )
      .catch(( reason: any ) => {

        new Promise<any>(( resolve, reject ) => {
          this.events.removeFailed( {
            id: cardId,
            reason: reason
          } );
          resolve();
        } );

        return Promise.reject( {
          identifier: "RemoveFailed",
          data: {
            reason: reason
          }
        } );

      } );

  }

  /*****************************************************************/

  private readonly makeConditions = ( filtrationCriteria: storageInterfaces.powertel.card.FiltrationCriteria ): Promise<QueryConditions> => {

    return new Promise<QueryConditions>(( resolve, reject ) => {

      let conditions: QueryConditions = {};

      if ( filtrationCriteria.pin ) {
        conditions[ "pin" ] = filtrationCriteria.pin;
      }

      if ( filtrationCriteria.puk ) {
        conditions[ "puk" ] = filtrationCriteria.puk;
      }

      if ( filtrationCriteria.mdn ) {
        conditions[ "mdn" ] = filtrationCriteria.mdn;
      }

      if ( filtrationCriteria.buyer ) {
        if ( filtrationCriteria.buyer.cardSaleId ) {
          conditions[ "buyer.cardSaleId" ] = mongoose.Types.ObjectId( filtrationCriteria.buyer.cardSaleId );
        }
        if ( filtrationCriteria.buyer.fullName ) {
          conditions[ "buyer.fullName" ] = filtrationCriteria.buyer.fullName;
        }
      }

      if ( filtrationCriteria.user ) {
        if ( filtrationCriteria.user.userId ) {
          conditions[ "user.userId" ] = mongoose.Types.ObjectId( filtrationCriteria.user.userId );
        }
        if ( filtrationCriteria.user.emailAddress ) {
          conditions[ "user.emailAddress" ] = filtrationCriteria.user.emailAddress;
        }
        if ( filtrationCriteria.user.fullName ) {
          conditions[ "user.fullName" ] = filtrationCriteria.user.fullName;
        }
      }

      if ( filtrationCriteria.textSearch ) {
        conditions.$text = { $search: filtrationCriteria.textSearch };
      }

      resolve( conditions );

    } );

  }

  /*****************************************************************/

  private readonly makeSortCriteria = ( sortCriteria: storageInterfaces.powertel.card.SortCriteria ): Promise<string> => {

    return new Promise<string>(( resolve, reject ) => {
      let sortString;
      sortString = sortCriteria.criteria;
      if ( sortCriteria.order === "Descending" ) {
        sortString = "-" + sortString;
      }
      resolve( sortString );
    } );

  }

  /*****************************************************************/

  private readonly generateUpdateDetails = ( document: Model, details: storageInterfaces.powertel.card.UpdateDetails ): Promise<Model> => {

    return new Promise<Model>(( resolve, reject ) => {

      if ( details.pin ) {
        document.pin = details.pin;
      }

      if ( details.puk ) {
        document.puk = details.puk;
      }

      if ( details.mdn ) {
        document.mdn = details.mdn;
      }

      if ( details.buyer ) {
        if ( details.buyer.cardSaleId ) {
          document.buyer.cardSaleId = mongoose.Types.ObjectId( details.buyer.cardSaleId );
        }
        if ( details.buyer.fullName ) {
          document.buyer.fullName = details.buyer.fullName;
        }
      }

      if ( details.user ) {
        if ( details.user.userId ) {
          document.user.userId = mongoose.Types.ObjectId( details.user.userId );
        }
        if ( details.user.emailAddress ) {
          document.user.emailAddress = details.user.emailAddress;
        }
        if ( details.user.fullName ) {
          document.user.fullName = details.user.fullName;
        }
      }

      resolve( document );

    } );

  }

  /*****************************************************************/

  private readonly convertToAbstract = ( cards: Model[], forceThrow = false ): Promise<dataModel.powertel.card.Super[]> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return new Promise<dataModel.powertel.card.Super[]>(( resolve, reject ) => {

          let returnCards: dataModel.powertel.card.Super[] = [];

          cards.forEach(( card ) => {

            let returnCard: dataModel.powertel.card.Super = {
              id: ( <mongoose.Types.ObjectId>card._id ).toHexString(),
              pin: card.pin,
              puk: card.puk,
              mdn: card.mdn,
              createdAt: card.createdAt,
              updatedAt: card.updatedAt
            };
            if ( card.buyer ) {
              returnCard.buyer = {
                id: ( card.buyer._id as mongoose.Types.ObjectId ).toHexString(),
                cardSaleId: ( card.buyer.cardSaleId as mongoose.Types.ObjectId ).toHexString(),
                fullName: card.buyer.fullName,
                createdAt: card.buyer.createdAt,
                updatedAt: card.buyer.updatedAt
              };
            }
            if ( card.user ) {
              returnCard.user = {
                id: ( card.user._id as mongoose.Types.ObjectId ).toHexString(),
                userId: ( card.user.userId as mongoose.Types.ObjectId ).toHexString(),
                emailAddress: card.user.emailAddress,
                fullName: card.user.fullName,
                createdAt: card.user.createdAt,
                updatedAt: card.user.updatedAt
              };
            }

            returnCards.push( returnCard );

          } );

          resolve( returnCards );

        } );

      } );

  }

  /*****************************************************************/

}

/******************************************************************************/

interface QueryConditions {
  "pin"?: number;
  "puk"?: number;
  "mdn"?: number;

  "buyer.cardSaleId"?: mongoose.Types.ObjectId;
  "buyer.fullName"?: string;

  "user.userId"?: mongoose.Types.ObjectId;
  "user.emailAddress"?: string;
  "user.fullName"?: string;

  $text?: { $search: string };
}

/******************************************************************************/

export default ( params: {
  emitEvent: src.setupConfig.eventManager.Emit;
  mapDetails: sharedLogicInterfaces.dataStructures.MapDetails;
  checkThrow: sharedLogicInterfaces.moders.CheckThrow;
} ): storageInterfaces.powertel.Card => {
  return new MongoCard( {
    events: eventsFactory( params.emitEvent ),
    Model: CardMongooseModel,
    mapDetails: params.mapDetails,
    checkThrow: params.checkThrow
  } );
}

/******************************************************************************/
