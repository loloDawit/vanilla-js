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
        resolve(body);
      });
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = { saveDataToFile, helper };
