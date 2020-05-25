const express = require('express')
const serveStatic = require('serve-static')
const app = express()

app.use(serveStatic(__dirname + '/build'))
app.use((req, res, next) => {
  if (req.header('x-forwarded-proto') !== 'https') {
    res.redirect(`https://${req.header('host')}${req.url}`)
  } else {
    next()
  }
})

const port = process.env.PORT || 5000
app.listen(port)
console.log('server started ' + port) // eslint-disable-line no-console

/*
Antoher way
const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'dist')));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);
console.log('Server started '+ port);  // eslint-disable-line no-console
*/
