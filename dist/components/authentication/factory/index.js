"use strict";
/******************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
/******************************************************************************/
exports.default = function (Authentication, events, checkThrow, getUsers, getUserById, setUserInSession, getUserFromSession, signOutOfSession, cleanUsers) {
    return new Authentication(events, checkThrow, getUsers, getUserById, setUserInSession, getUserFromSession, signOutOfSession, cleanUsers);
};
/******************************************************************************/
