/******************************************************************************/

import * as express from "express";

import * as dataModel from "../../../../data-model";
import * as EventListener from "../../../../event-listener/interfaces";
import * as Components from "../../../../components/interfaces";
import * as Procedures from "../../../../procedures/interfaces";

import * as response from "../../../../components/response/interfaces";
import * as helpers from "../../../helpers/interfaces";
import * as authProcedures from "../../../../procedures/core/common/auth/interfaces";

/******************************************************************************/

export default (
  signInProcedure: authProcedures.SignIn,
  setViewContexts: helpers.SetViewContexts,
  sendResponse: response.Send
): express.Router => {

  /*********************************************************/

  let router = express.Router();
  //router.use( authCheck );

  /*********************************************************/

  router.post( "/signIn", signIn );
  router.get( "/signOut", signOut );

  /*********************************************************/

  function signIn ( req: express.Request, res: express.Response, next: express.NextFunction ) {

    let currentUser: dataModel.core.user.Super;

    if ( !req.body.emailAddress ) {
      return sendResponse( res, "passpointAdmin", false, "Email address is missing", null );
    }

    if ( !req.body.password ) {
      return sendResponse( res, "passpointAdmin", false, "Password is missing", null );
    }

    signInProcedure( req.body.emailAddress, req.body.password, req )
      .then(( signedInUser: dataModel.core.user.Super ) => {

        currentUser = signedInUser;
        return setViewContexts( req, signedInUser );

      } )
      .then(( output: helpers.ContextsOutput ) => {

        output.payload.currentUser = currentUser;
        return sendResponse( res, output.view, true, null, output.payload );

      } )
      .catch(( reason: any ) => {

        

      } );

  }

  /*********************************************************/

  function signOut ( req: express.Request, res: express.Response, next: express.NextFunction ) {

  }

  /*********************************************************/

  //function authCheck () {}

  /*********************************************************/

  return router;

}

/******************************************************************************/