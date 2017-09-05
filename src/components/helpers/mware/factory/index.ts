/******************************************************************************/

import * as interfaces from "../interfaces";

/******************************************************************************/

export default ( Mware: interfaces.Constructor ): interfaces.ClassInstance => {
  return new Mware();
}

/******************************************************************************/