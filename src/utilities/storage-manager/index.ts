/******************************************************************************/

import * as interfaces from "../../interfaces";
import mongodbStorageFactory from "./mongodb";

/******************************************************************************/

export default ( config : interfaces.Config ) : interfaces.utilities.StorageManager => {
  return mongodbStorageFactory( config );
}

/******************************************************************************/
