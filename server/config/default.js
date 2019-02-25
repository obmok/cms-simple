const path = require('path');

module.exports = {
  port: 5000,
  secret: 'mysecret',
  root: process.cwd(),
  templatesRoot: path.join(process.cwd(), 'templates'),
  useNewUrlParser: true,
  mongodb: {
    debug: true,
    uri: 'mongodb://localhost/cms'
  }
};
