const http = require('http');
const PORT = 500;
const data = require('./data')

const server = http.createServer((req, res) =>{
    if (req.url === '/api/v1/stores' && req.method == 'GET') {
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.write(JSON.stringify(data[0]));
        res.end()
    }
    else if (req.url === '/api/v1/stores' && req.method == 'POST') {
        res.statusCode = 200;
    res.setHeader('Content-Type','application/json');
    res.write('<h1>POST</h1>');
    res.end()
    }
    else if (req.url === '/api/v1/stores' && req.method == 'DELETE') {
        res.statusCode = 200;
    res.setHeader('http','html');
    res.write('<h1>DELETE</h1>');
    res.end()
    }
    else{
        res.statusCode = 400;
        res.setHeader('http','html');
        res.write('<h1> Bad Connection</h1>');
        res.end()
    }
    
}

)
server.listen(PORT,()=> console.log(`server running on port ${PORT}`));