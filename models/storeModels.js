var data = require('../data');
const { saveDataToFile } = require('../helper');

// create CURD fuctions
/*
create store
update existing store
read store: all strore or specific store
delete store
*/

// read all store
const findAll = () => {
  return new Promise((resolve, reject) => {
    resolve(data);
  });
};

// read a specific store using store id
const findById = (id) => {
  return new Promise((resolve, reject) => {
    const store = data.find((store) => store.storeNo === id);
    if (store !== undefined) {
      resolve(store);
    } else {
      reject(new Error());
    }
  });
};

//create store
const create = (newStore) => {
  return new Promise((resolve, reject) => {
    data.push(newStore);
    saveDataToFile('./data.json', data);
    resolve(newStore);
  });
};
// update a store
const update = (id, store) => {
  return new Promise((resolve, reject) => {
    const findStore = data.findIndex((store) => store.storeNo === id);
    data[findStore] = { ...store }; // more explaniation
    console.log(store);
    saveDataToFile('./data.json', data);
    resolve(store);
  });
};

// delete a store -> storeNo
const remove = (id, store) => {
  return new Promise((resolve, reject) => {
    data = data.filter((store) => store.storeNo != id);
    saveDataToFile('./data.json', data);
    resolve(data);
  });
};

module.exports = { findAll, findById, create, update, remove };
