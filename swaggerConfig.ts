import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Nom de mon API',
      version: '1.0.0',
      description: 'Une description de mon API',
    },
  },
  apis: ['./app/routes/*.ts'], // Assurez-vous que le chemin correspond à vos fichiers de routes TypeScript
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
