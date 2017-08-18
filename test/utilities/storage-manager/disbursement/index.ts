/******************************************************************************/

import * as Promise from "bluebird";

import * as src from "../../../../src/index";

/******************************************************************************/

export interface Events {

  got : ( params : any ) => any;
  getFailed : ( params : any ) => any;

  gotById : ( params : any ) => any;
  getByIdFailed : ( params : any ) => any;

  added : ( params : any ) => any;
  addFailed : ( params : any ) => any;

  updated : ( params : any ) => any;
  updateFailed : ( params : any ) => any;

  removed : ( params : any ) => any;
  removeFailed : ( params : any ) => any;

}

/******************************************************************************/

export interface Get {

  ( filtrationCriteria : dataModel.getParams.disbursement.FiltrationCriteria , sortCriteria : dataModel.getParams.disbursement.SortCriteria , limit : number ) : Promise<any>;

}

/******************************************************************************/

export interface GetById {

  ( disbursementId : string ) : Promise<any>;

}

/******************************************************************************/

export interface AddBatchParams {

  userId : string;
  roundId : string;
  complete : boolean;

}

export interface AddBatch {

  ( disbursements : AddBatchParams[] ) : Promise<any>;

}

export interface Add {

  ( userId : string , roundId : string , complete : boolean ) : Promise<any>;

}

/******************************************************************************/

export interface Update {

  ( filtrationCriteria : dataModel.getParams.disbursement.FiltrationCriteria , details : any ) : Promise<any>;

}

export interface UpdateById {

  ( disbursementId : string , details : any ) : Promise<any>;

}

/******************************************************************************/

export interface Remove {

  ( filtrationCriteria : dataModel.getParams.disbursement.FiltrationCriteria ) : Promise<any>;

}

export interface RemoveById {

  ( disbursementId : string ) : Promise<any>;

}

/******************************************************************************/
