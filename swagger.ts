import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'My API',
    description: 'API documentation generated by swagger-autogen',
  },
  host: 'localhost:3000',
  schemes: ['http'],
};

const outputFile = './swagger-output.json';
const routes = ['./src/routes/index.ts'];

swaggerAutogen()(outputFile, routes, doc).then(() => {
  console.log('Swagger documentation generated successfully.');
});
