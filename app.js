import express from 'express';

const PORT = 5000;
const app = express();

// Init middlewares - should before init API endpoints
const middlewareSetup = require('./setups/middlewareSetup');

middlewareSetup.setup(app);

// Init endpoint
const routes = require('./setups/routeSetup');

routes.setup(app);

// Register Error Handler - should after all other configures
middlewareSetup.handlerError(app);

// Init swagger
const swaggerSetup = require('./setups/swaggerSetup');

swaggerSetup.setup(app);

// Start server
app.listen(PORT, () => {
  console.log(`########## Server running on port ${PORT}`);
});

// For testing
module.exports = app;
