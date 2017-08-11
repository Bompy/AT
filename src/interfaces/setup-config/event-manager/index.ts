/******************************************************************************/

import * as interfaces from "../../../interfaces";
import * as hooks from "./hooks";

/******************************************************************************/

export { hooks };

/******************************************************************************/

export interface Emit {
  ( happening : interfaces.dataModel.Happening ) : void;
}

export interface UpdateReferences {
  ( components : interfaces.Components , tasks : interfaces.Tasks ) : void
}

/******************************************************************************/

export interface Hooks {
  hookStructure : HookStructure;

  readonly updateReferences : interfaces.setupConfig.eventManager.hooks.UpdateReferences;
}

/******************************************************************************/

export interface HookStructure {
  readonly [ index : string ] : ContextHooks;
}

/*****************************************/

export interface ContextHooks {
  readonly [ index : string ] : Hook;
}

/*****************************************/

export interface Hook {
  tags : string[];
  afterware : Afterware[];

  readonly [ index : string ] : string[] | Afterware[];
}

export interface Afterware {
  ( happening : interfaces.dataModel.Happening ) : void;
}

/******************************************************************************/
