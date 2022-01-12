const { helper, httpResponse } = require('../helper');
const Store = require('../models/storeModels');

const getAllStores = async (req, res) => {
  try {
    const store = await Store.findAll();
    httpResponse(200, res, store);
  } catch (error) {
    console.log(error);
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
    const newStore = await Store.create(JSON.parse(body));
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
    console.log('store no');
    if (!store) {
      httpResponse(404, res, '');
    } else {
      const body = await helper(req);
      const updateStore = await Store.update(id, JSON.parse(body));
      httpResponse(200, res, updateStore);
    }
  } catch (error) {
    console.log('error',error);
    httpResponse(400, res, {
      error: 'Body is not provided',
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
