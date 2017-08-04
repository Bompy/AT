/******************************************************************************/

import * as storageManager from "../../../interfaces/utilities/storage-manager";

import * as user from "./user";
import * as event from "./event";
import * as progression from "./progression";
import * as notification from "./notification";
import * as subscription from "./subscription";

import * as amendmentRequest from "./amendment-request";
import * as customerGroup from "./customer-group";
import * as productType from "./product-type";
import * as product from "./product";
import * as order from "./order";

/******************************************************************************/

export { user, event, progression, notification, subscription };
export { amendmentRequest, customerGroup, productType, product, order };

/******************************************************************************/

export interface StorageController { }

/******************************************************************************/

export interface User extends StorageController {
  get: storageManager.user.Get;
  getById: storageManager.user.GetById;

  add: storageManager.user.Add;
  addBatch: storageManager.user.AddBatch;

  update: storageManager.user.Update;
  updateById: storageManager.user.UpdateById;

  remove: storageManager.user.Remove;
  removeById: storageManager.user.RemoveById;
}

/******************************************************************************/

export interface Progression extends StorageController {
  get: storageManager.progression.Get;
  getById: storageManager.progression.GetById;

  add: storageManager.progression.Add;
  addBatch: storageManager.progression.AddBatch;

  update: storageManager.progression.Update;
  updateById: storageManager.progression.UpdateById;

  remove: storageManager.progression.Remove;
  removeById: storageManager.progression.RemoveById;
};

/******************************************************************************/

export interface Event extends StorageController {
  get: storageManager.event.Get;
  getById: storageManager.event.GetById;

  add: storageManager.event.Add;
  addBatch: storageManager.event.AddBatch;

  update: storageManager.event.Update;
  updateById: storageManager.event.UpdateById;

  remove: storageManager.event.Remove;
  removeById: storageManager.event.RemoveById;
};

/******************************************************************************/

export interface Notification extends StorageController {
  get: storageManager.notification.Get;
  getById: storageManager.notification.GetById;

  add: storageManager.notification.Add;
  addBatch: storageManager.notification.AddBatch;

  update: storageManager.notification.Update;
  updateById: storageManager.notification.UpdateById;

  remove: storageManager.notification.Remove;
  removeById: storageManager.notification.RemoveById;
};

/******************************************************************************/

export interface Subscription extends StorageController {
  get: storageManager.subscription.Get;
  getById: storageManager.subscription.GetById;

  add: storageManager.subscription.Add;
  addBatch: storageManager.subscription.AddBatch;

  update: storageManager.subscription.Update;
  updateById: storageManager.subscription.UpdateById;

  remove: storageManager.subscription.Remove;
  removeById: storageManager.subscription.RemoveById;
};

/******************************************************************************/

export interface AmendmentRequest extends StorageController {
  get: storageManager.amendmentRequest.Get;
  getById: storageManager.amendmentRequest.GetById;

  add: storageManager.amendmentRequest.Add;
  addBatch: storageManager.amendmentRequest.AddBatch;

  update: storageManager.amendmentRequest.Update;
  updateById: storageManager.amendmentRequest.UpdateById;

  remove: storageManager.amendmentRequest.Remove;
  removeById: storageManager.amendmentRequest.RemoveById;
};

/******************************************************************************/

export interface CustomerGroup extends StorageController {
  get: storageManager.customerGroup.Get;
  getById: storageManager.customerGroup.GetById;

  add: storageManager.customerGroup.Add;
  addBatch: storageManager.customerGroup.AddBatch;

  update: storageManager.customerGroup.Update;
  updateById: storageManager.customerGroup.UpdateById;

  remove: storageManager.customerGroup.Remove;
  removeById: storageManager.customerGroup.RemoveById;
};

/******************************************************************************/

export interface ProductType extends StorageController {
  get: storageManager.productType.Get;
  getById: storageManager.productType.GetById;

  add: storageManager.productType.Add;
  addBatch: storageManager.productType.AddBatch;

  update: storageManager.productType.Update;
  updateById: storageManager.productType.UpdateById;

  remove: storageManager.productType.Remove;
  removeById: storageManager.productType.RemoveById;
};

/******************************************************************************/

export interface Product extends StorageController {
  get: storageManager.product.Get;
  getById: storageManager.product.GetById;

  add: storageManager.product.Add;
  addBatch: storageManager.product.AddBatch;

  update: storageManager.product.Update;
  updateById: storageManager.product.UpdateById;

  remove: storageManager.product.Remove;
  removeById: storageManager.product.RemoveById;
};

/******************************************************************************/

export interface Order extends StorageController {
  get: storageManager.order.Get;
  getById: storageManager.order.GetById;

  add: storageManager.order.Add;
  addBatch: storageManager.order.AddBatch;

  update: storageManager.order.Update;
  updateById: storageManager.order.UpdateById;

  remove: storageManager.order.Remove;
  removeById: storageManager.order.RemoveById;
};

/******************************************************************************/
