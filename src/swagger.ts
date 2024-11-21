import swaggerAutogen from 'swagger-autogen';
import env from './utils/env';
// const doc = {
//   info: {
//     version: "1.0.0",
//     title: "My API",
//     description:
//       "Documentation automatically generated by the <b>swagger-autogen</b> module.",
//   },
//   host: "localhost:1122",
//   basePath: "/api-docs",
//   schemes: ["http", "https"],
//   consumes: ["application/json"],
//   produces: ["application/json"],
//   tags: [
//     {
//       name: "User",
//       description: "Endpoints",
//     },
//   ],
//   securityDefinitions: {
//     api_key: {
//       type: "apiKey",
//       name: "api_key",
//       in: "header",
//     },
//     petstore_auth: {
//       type: "oauth2",
//       authorizationUrl: "https://petstore.swagger.io/oauth/authorize",
//       flow: "implicit",
//       scopes: {
//         read_pets: "read your pets",
//         write_pets: "modify pets in your account",
//       },
//     },
//   },
//   definitions: {
//     Parents: {
//       father: "Simon Doe",
//       mother: "Marie Doe",
//     },
//     User: {
//       name: "Jhon Doe",
//       age: 29,
//       parents: {
//         $ref: "#/definitions/Parents",
//       },
//       diplomas: [
//         {
//           school: "XYZ University",
//           year: 2020,
//           completed: true,
//           internship: {
//             hours: 290,
//             location: "XYZ Company",
//           },
//         },
//       ],
//     },
//     AddUser: {
//       $name: "Jhon Doe",
//       $age: 29,
//       about: "",
//     },
//   },
// };

const doc = {
  info: {
    title: 'My API Documentation',
    version: '1.0.0',
  },
  host: `localhost:${env.NODE_PORT}`,
  basePath: `${env.BASE_PATH}/v1`,
  consumes: ["application/json"],
  produces: ["application/json"],
  schemas: ["http"],
};
const outputFile = './src/swagger-output.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen()(outputFile, endpointsFiles, doc).then(() => {
  require('./index.js');
});
