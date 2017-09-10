"use strict";
/******************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
var Promise = require("bluebird");
var generic_model_class_1 = require("../../generic-model-class");
var generic_event_class_1 = require("../../generic-event-class");
var model_1 = require("./model");
/*******************************************************************************/
exports.default = function (emitEvent, mapDetails, checkThrow) {
    var models = new generic_event_class_1.default(emitEvent, "Routers|NewRouterStock");
    return new generic_model_class_1.default(models, model_1.MongooseModel, mapDetails, checkThrow, makeConditions, makeSortCriteria, generateAddDetails, generateUpdateDetails, convertToAbstract);
};
/******************************************************************************/
function makeConditions(filtrationCriteria) {
    return new Promise(function (resolve, reject) {
        var conditions = {};
        if (filtrationCriteria.type) {
            conditions["type"] = filtrationCriteria.type;
        }
        if (filtrationCriteria.initialCount) {
            conditions["initialCount"] = {};
            if (filtrationCriteria.initialCount.min) {
                conditions["initialCount"].$gte = filtrationCriteria.initialCount.min;
            }
            if (filtrationCriteria.initialCount.max) {
                conditions["initialCount"].$lte = filtrationCriteria.initialCount.max;
            }
        }
        if (filtrationCriteria.newCount) {
            conditions["newCount"] = {};
            if (filtrationCriteria.newCount.min) {
                conditions["newCount"].$gte = filtrationCriteria.newCount.min;
            }
            if (filtrationCriteria.newCount.max) {
                conditions["newCount"].$lte = filtrationCriteria.newCount.max;
            }
        }
        if (filtrationCriteria.amount) {
            conditions["amount"] = {};
            if (filtrationCriteria.amount.min) {
                conditions["amount"].$gte = filtrationCriteria.amount.min;
            }
            if (filtrationCriteria.amount.max) {
                conditions["amount"].$lte = filtrationCriteria.amount.max;
            }
        }
        if (filtrationCriteria.textSearch) {
            conditions.$text = { $search: filtrationCriteria.textSearch };
        }
        resolve(conditions);
    });
}
/******************************************************************************/
function makeSortCriteria(sortCriteria) {
    return new Promise(function (resolve, reject) {
        var sortString;
        sortString = sortCriteria.criteria;
        if (sortCriteria.order === "Descending") {
            sortString = "-" + sortString;
        }
        resolve(sortString);
    });
}
/******************************************************************************/
function generateAddDetails(models) {
    var returnDetails = [];
    models.forEach(function (model) {
        var details = {
            type: model.type,
            initialCount: model.initialCount,
            newCount: model.newCount,
            amount: model.amount
        };
        returnDetails.push(details);
    });
    return returnDetails;
}
/******************************************************************************/
function generateUpdateDetails(document, details) {
    return new Promise(function (resolve, reject) {
        if (details.type) {
            document.type = details.type;
        }
        if (details.initialCount) {
            document.initialCount = details.initialCount;
        }
        if (details.newCount) {
            document.newCount = details.newCount;
        }
        if (details.amount) {
            document.amount = details.amount;
        }
        resolve(document);
    });
}
/******************************************************************************/
function convertToAbstract(models, forceThrow) {
    if (forceThrow === void 0) { forceThrow = false; }
    return this.checkThrow(forceThrow)
        .then(function (response) {
        return new Promise(function (resolve, reject) {
            var returnModels = [];
            models.forEach(function (model) {
                var returnModel = {
                    id: model._id.toHexString(),
                    type: model.type,
                    initialCount: model.initialCount,
                    newCount: model.newCount,
                    amount: model.amount,
                    createdAt: model.createdAt,
                    updatedAt: model.updatedAt
                };
                returnModels.push(returnModel);
            });
            resolve(returnModels);
        });
    });
}
/******************************************************************************/ 
