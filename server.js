const http = require('http');
const { getAllStores, getStoreById, createStore, updateStore, deleteStore } = require('./controllers/storeController');
require('dotenv').config();
const PORT = process.env.PORT;

const server = http.createServer((req, res) => {
  if (req.url === '/api/v1/stores' && req.method == 'GET') {
    getAllStores(req, res);
  } else if (req.url.match(/\/api\/v1\/stores\/\w+/) && req.method === 'GET') {
    const idPath = req.url.match(/\/api\/v1\/stores\/\w+/);
    const id = idPath[0].split('/')[4];
    getStoreById(req, res, id);
  } else if (req.url === '/api/v1/stores' && req.method == 'POST') {
    createStore(req, res);
  } else if (req.url.match(/\/api\/v1\/stores\/\w+/) && req.method === 'PUT') {
    const idPath = req.url.match(/\/api\/v1\/stores\/\w+/);
    const id = idPath[0].split('/')[4];
    updateStore(req, res, id);
  } else if (req.url.match(/\/api\/v1\/stores\/\w+/) && req.method === 'DELETE') {
    const idPath = req.url.match(/\/api\/v1\/stores\/\w+/);
    const id = idPath[0].split('/')[4];
    deleteStore(req, res, id);
  } else {
    res.statusCode = 400;
    res.setHeader('Content-Type', 'application/json');
    res.write(JSON.stringify({ message: 'Not found.' }));
    res.end();
  }
});
server.listen(PORT, () => console.log(`server running on port ${PORT}`));

module.exports = server;
