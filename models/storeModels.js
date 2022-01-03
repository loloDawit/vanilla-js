const data = require('../data');
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
const findById = (id) =>{
return new Promise((resolve, reject) =>{
    const store = data.find((store) => store.storeNo === id);

    resolve(store);
})
}

//create store
const create = (newStore) =>{
    return new Promise((resolve, reject) =>{
        data.push(newStore);
        saveDataToFile('./data.js', data);
        resolve(newStore);
    }

    )

}



module.exports = { findAll, findById, create };
