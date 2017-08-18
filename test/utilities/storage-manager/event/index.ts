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

  ( filtrationCriteria : dataModel.getParams.event.FiltrationCriteria , sortCriteria : dataModel.getParams.event.SortCriteria , limit : number ) : Promise<any>;

}

/******************************************************************************/

export interface GetById {

  ( eventId : string ) : Promise<any>;

}

/******************************************************************************/

export interface AddBatchParams {

  context : string;
  identifier : string;
  tags : string[];
  data : any;

}

export interface AddBatch {

  ( events : AddBatchParams[] ) : Promise<any>;

}

export interface Add {

  ( context : string , identifier : string , tags : string[] , data : any ) : Promise<any>;

}

/******************************************************************************/

export interface Update {

  ( filtrationCriteria : dataModel.getParams.event.FiltrationCriteria , details : any ) : Promise<any>;

}

export interface UpdateById {

  ( eventId : string , details : any ) : Promise<any>;

}

/******************************************************************************/

export interface Remove {

  ( filtrationCriteria : dataModel.getParams.event.FiltrationCriteria ) : Promise<any>;

}

export interface RemoveById {

  ( eventId : string ) : Promise<any>;

}

/******************************************************************************/
