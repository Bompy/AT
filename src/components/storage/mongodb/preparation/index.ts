/******************************************************************************/

import * as Promise from "bluebird";
import * as mongoose from "mongoose";

import * as src from "../../../../src";

/******************************************************************************/

export let ignoreEmpty = ( value: any ): any => {
  return ( value == null ) ? undefined : value;
}

/******************************************************************************/

