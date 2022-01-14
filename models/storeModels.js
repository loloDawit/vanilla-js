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
      reject({ message: 'store not found', error: new Error(), code: 400 });
    }
  });
};

//create store
const create = (newStore) => {
  // case I {}
  return new Promise((resolve, reject) => {
    if (Object.keys(newStore).length !== 0) {
      data.push(newStore);
      saveDataToFile('./data.json', data);
      resolve(newStore);
    } else {
      reject(new Error());
    }
  });
};
// update a store
const update = (id, store) => {
  return new Promise((resolve, reject) => {
    // check for empty store
    if (Object.keys(store).length !== 0) {
      const findStore = data.findIndex((store) => store.storeNo === id);
      data[findStore] = { ...store };
      saveDataToFile('./data.json', data);
      resolve(store);
    } else {
      reject({message: 'provide Body!', error: new Error()});
    }
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
