const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');

const port = process.env.PORT || 8081;
const app = express();
const Server = http.createServer(app);

routes(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static('../public'));

Server.listen(port, () =>{
  console.log(`server is running in port: ${port}`);
})
