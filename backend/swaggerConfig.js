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
  apis: ['./controllers/*.js'], // Path to your route files for documentation
};

const swaggerSpec = swaggerJSDoc(options);

const setupSwagger = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

export default setupSwagger;
