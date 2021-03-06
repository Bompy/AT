"use strict";
/******************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
var canon_1 = require("./canon");
var events_1 = require("./events");
var factory_1 = require("./factory");
/******************************************************************************/
exports.default = function (emitEvent, checkThrow, getUsers, getUserById, setUserInSession, getUserFromSession, signOutOfSession, cleanUsers) {
    return factory_1.default(canon_1.default, new events_1.default(emitEvent), checkThrow, getUsers, getUserById, setUserInSession, getUserFromSession, signOutOfSession, cleanUsers);
};
/******************************************************************************/
/******************************************************************************/
