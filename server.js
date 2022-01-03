const http = require('http');
const {getAllStores, getStoreById} = require('./controllers/storeController');

const PORT = 500;

const server = http.createServer((req, res) => {
  if (req.url === '/api/v1/stores' && req.method == 'GET') {
    getAllStores(req, res);
  } else if (req.url.match(/\/api\/v1\/stores\/\w+/) && req.method === 'GET') {
    const idPath = req.url.match(/\/api\/v1\/stores\/\w+/);
    const id = idPath[0].split('/')[4];
    getStoreById(req, res, id);
  } else if (req.url === '/api/v1/stores' && req.method == 'POST') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.write('<h1>POST</h1>');
    res.end();
  } else if (req.url === '/api/v1/stores' && req.method == 'DELETE') {
    res.statusCode = 200;
    res.setHeader('http', 'html');
    res.write('<h1>DELETE</h1>');
    res.end();
  } else {
    res.statusCode = 400;
    res.setHeader('http', 'html');
    res.write('<h1> Bad Connection</h1>');
    res.end();
  }
});
server.listen(PORT, () => console.log(`server running on port ${PORT}`));
