import * as swaggerJSDoc from 'swagger-jsdoc';

const port = process.env.PORT || 4000;

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
        url: `http://localhost:8000/`,
      },
    ],
  },
  apis: ['./src/routes/*.ts'],
};
