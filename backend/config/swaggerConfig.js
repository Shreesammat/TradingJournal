// swaggerConfig.js
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Trading Journal API',
    version: '1.0.0',
    description: 'This is the API documentation for Trading Journal',
  },
  servers: [
    {
      url: 'http://localhost:3000', // Change to your actual server URL
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./routes/*.js'], // not relative path, absolute path of the routes folder for project
};

const swaggerSpec = swaggerJSDoc(options);

const setupSwagger = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

export default setupSwagger;