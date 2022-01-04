const http = require('http');
const { getAllStores, getStoreById, createStore, updateStore, deleteStore } = require('./controllers/storeController');

const PORT = 500;

const server = http.createServer((req, res) => {
  console.log(req.url);
  console.log(req.method);

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
    res.setHeader('http', 'html');
    res.write('<h1> Bad Connection</h1>');
    res.end();
  }
});
server.listen(PORT, () => console.log(`server running on port ${PORT}`));
