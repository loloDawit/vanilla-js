const fs = require('fs');
// create function to save date in our file
const saveDataToFile = (fileName, conent) => {
  fs.writeFileSync(fileName, JSON.stringify(conent), 'utf-8', (error) => {
    if (error) {
      console.log(error);
    }
  });
};

// funtion returns body --> string form
const helper = (req) => {
  return new Promise((resolve, reject) => {
    try {
      let body = '';
      req.on('data', (buffer) => {
        body += buffer.toString();
      });
      req.on('end', () => {
        body ? resolve(JSON.parse(body)) : reject('Body not provided.'); // server crashed when passing undefined body => kee[ crashing when updating the store with undefined body
      });
    } catch (error) {
      reject(error);
    }
  });
};
/**
 * httpResponse sets the success http response
 * @param {*} statusCode
 * @param {*} response
 * @param {*} data
 */
const httpResponse = (statusCode, response, data) => {
  // depending on the statusCode we want to respond diffrenly
  response.setHeader('Content-Type', 'application/json');
  if (statusCode === 200 || statusCode === 201) {
    response.statusCode = statusCode;
    response.write(JSON.stringify(data));
  } else if (statusCode === 404 || statusCode === 400) {
    response.statusCode = statusCode;
    response.write(JSON.stringify(data ? data : { error: 'store not found' }));
  }
  response.end();
};
module.exports = { saveDataToFile, helper, httpResponse };
