const { helper } = require('../helper');
const Store = require('../models/storeModels');

const getAllStores = async (req, res) => {
  try {
    const store = await Store.findAll();
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.write(JSON.stringify(store));
    res.end();
  } catch (error) {
    console.log(error);
  }
};

const getStoreById = async (req, res, id) => {
  try {
    const store = await Store.findById(id);

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.write(JSON.stringify(store));
    res.end();
  } catch (error) {
    console.log(error);
    res.statusCode = 404;
    res.setHeader('Content-Type', 'application/json');
    res.write(JSON.stringify({ error: 'store not found' }));
    res.end();
  }
};

const createStore = async (req, res) => {
  try {
    const body = await helper(req);
    const newStore = await Store.create(JSON.parse(body));
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.write(JSON.stringify(newStore));
    res.end();
  } catch (error) {
    console.log(error);
  }
};

const updateStore = async (req, res, id) => {
  // if the store exists, update the requested information
  // if not log an error with message
  try {
    const store = await Store.findById(id); // finding the store using storeNo
    if (!store) {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'application/json');
      res.write(JSON.stringify({ errorMessage: 'Store Not Found!' }));
      res.end();
    } else {
      const body = await helper(req);
      const updateStore = await Store.update(id, JSON.parse(body));
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.write(JSON.stringify(updateStore));
      res.end();
    }
  } catch (error) {
    console.log(error);
  }
};

const deleteStore = async (req, res, id) => {
  try {
    // find if the store exists or not
    const store = await Store.findById(id);
    if (!store) {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'application/json');
      res.write(JSON.stringify({ errorMessage: 'Store Not Found!' }));
      res.end();
    } else {
      const deleteStore = await Store.remove(id);
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.write(JSON.stringify(deleteStore));
      res.end();
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllStores,
  getStoreById,
  createStore,
  updateStore,
  deleteStore,
};
