const { helper, httpResponse } = require('../helper');
const Store = require('../models/storeModels');

const getAllStores = async (req, res) => {
  try {
    const store = await Store.findAll();
    console.log(store);
    httpResponse(200, res, store);
  } catch (error) {
    httpResponse(error.code, res, { error: error.message });
  }
};

const getStoreById = async (req, res, id) => {
  try {
    const store = await Store.findById(id);
    httpResponse(200, res, store);
  } catch (error) {
    console.log(error);
    httpResponse(404, res, '');
  }
};

const createStore = async (req, res) => {
  try {
    const body = await helper(req);
    const newStore = await Store.create(body);
    httpResponse(201, res, newStore);
  } catch (error) {
    console.log('error', error);
    httpResponse(400, res, {
      error: 'Body is not provided',
    });
  }
};

const updateStore = async (req, res, id) => {
  // if the store exists, update the requested information
  // if not log an error with message
  try {
    const store = await Store.findById(id); // finding the store using storeNo
    const body = await helper(req);
    Object.keys(body).length === 0 && // what if the body is undefined? the server crahes
      httpResponse(404, res, {
        error: 'Body is not provided',
      });

    const updatedStore = {
      storeNo: body.storeNo ? body.storeNo : store.storeNo,
      storeName: body.storeName ? body.storeName : store.storeName,
      contact: {
        tie_line: body.contact ? body.contact.tie_line : store.contact.tie_line,
        phone: body.contact ? body.contact.phone : store.contact.phone,
      },
      location: {
        address: body.location ? body.location.address : store.location.address,
        city: body.location ? body.location.city : store.location.city,
        state: body.location ? body.location.state : store.location.state,
        zipcode: body.location ? body.location.zipcode : store.location.zipcode,
      },
      store_open_date: body.store_open_date || store.store_open_date,
    };
    const updateStore = await Store.update(id, updatedStore);
    httpResponse(200, res, updateStore);
  } catch (error) {
    console.log(error);
    httpResponse(400, res, {
      error: error.message,
    });
  }
};

const deleteStore = async (req, res, id) => {
  try {
    // find if the store exists or not
    const store = await Store.findById(id);
    const deleteStore = await Store.remove(id);
    httpResponse(200, res, deleteStore);
  } catch (error) {
    console.log(error);
    httpResponse(404, res, '');
  }
};

module.exports = {
  getAllStores,
  getStoreById,
  createStore,
  updateStore,
  deleteStore,
};
