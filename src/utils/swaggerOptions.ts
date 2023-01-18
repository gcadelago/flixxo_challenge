import * as swaggerJSDoc from 'swagger-jsdoc';

export const swaggerOptions: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Flixxo Challenge Backend',
      version: '1.0.0',
      description: 'Flixxo Challenge backend TS API Documentation',
    },
    servers: [
      {
        url: `https://flixxo-challenge.onrender.com/`,
      },
    ],
  },
  apis: ['./src/routes/*.ts'],
};
