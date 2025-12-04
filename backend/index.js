const express = require('express');
const app = express();
const { port } = require('./app/config');
const apiRouter = require('./app/routes/api');
const bodyParser = require('body-parser');
const cors = require('cors');


require('./app/db/mongoose');


app.use(bodyParser.json());
app.use(cors());


app.use('/api/', apiRouter);


app.listen(port, function() {
  console.log('serwer słucha... http://localhost:' + port);
});