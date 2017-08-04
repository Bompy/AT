/******************************************************************************/

import * as Promise from "bluebird";

import * as interfaces from "../../../../interfaces/index";

/******************************************************************************/

export interface Emitter {

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

  ( filtrationCriteria : interfaces.dataModel.getParams.product.FiltrationCriteria , sortCriteria : interfaces.dataModel.getParams.product.SortCriteria , limit : number ) : Promise<any>;

}

/******************************************************************************/

export interface GetById {

  ( progressionId : string ) : Promise<any>;

}

/******************************************************************************/

export interface AddBatchParams {

  userId : string;
  subject : interfaces.dataModel.ProgressionSubject;
  timeMeasure : interfaces.dataModel.ProgressionTimeMeasure;

}

export interface AddBatch {

  ( progressions : AddBatchParams[] ) : Promise<any>;

}

export interface Add {

  ( userId : string , subject : interfaces.dataModel.ProgressionSubject , timeMeasure : interfaces.dataModel.ProgressionTimeMeasure ) : Promise<any>;

}

/******************************************************************************/

export interface Update {

  ( filtrationCriteria : interfaces.dataModel.getParams.product.FiltrationCriteria , details : any ) : Promise<any>;

}

export interface UpdateById {

  ( progressionId : string , details : any ) : Promise<any>;

}

/******************************************************************************/

export interface Remove {

  ( filtrationCriteria : interfaces.dataModel.getParams.product.FiltrationCriteria ) : Promise<any>;

}

export interface RemoveById {

  ( progressionId : string ) : Promise<any>;

}

/******************************************************************************/