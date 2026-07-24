import swaggerJSDoc from "swagger-jsdoc";

const spec = swaggerJSDoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Users API",
      version: "1.0.0",
      description: "CMPT 372 demo API — documented with swagger-jsdoc.",
    },
    servers: [{ url: "http://localhost:3000" }],
  },

  apis: ["./src/*.ts"],
});

export default spec;
