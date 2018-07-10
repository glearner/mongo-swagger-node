const express = require('express');
const app = express();
const swagger = require('swagger-express-router');
const swaggerDocument = require('./swagger.json');
const bodyParser = require('body-parser')
const useBasePath = true; //whether to use the basePath from the swagger document when setting up the routes (defaults to false)
const middlewareObj = {
    'middleware-dishes': require('./middleware/dishes'),
    'middleware-promotions': require('./middleware/promotions'),
    'middleware-leaderships': require('./middleware/leaderships')
};
app.use(bodyParser.json())
swagger.setUpRoutes(middlewareObj, app, swaggerDocument, useBasePath);

app.listen(3000);