"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var blocks=require("./validation-blocks");exports.absent=function(t){return!!blocks.absentWrong(t,"track","object")||exports.absentChildren(t.track)},exports.absentChildren=function(t){return!!blocks.absentWrong(t,"trackId","string")||!!blocks.absentWrong(t,"trackName","string")},exports.optional=function(t){return!!blocks.optionalWrong(t,"track","object")||exports.optionalChildren(t.track)},exports.optionalChildren=function(t){return!!blocks.optionalWrong(t,"trackId","string")||!!blocks.optionalWrong(t,"trackName","string")};