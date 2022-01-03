const {helper} = require('../helper');
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
module.exports = { getAllStores, getStoreById, createStore };
