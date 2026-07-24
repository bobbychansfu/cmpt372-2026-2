import swaggerUi from "swagger-ui-express";

import app from "./app.ts";
import spec from "./swagger.ts";

const PORT = 3000;

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(spec));

app.get("/openapi.json", (_req, res) => {
  res.json(spec);
});

app.listen(PORT, () => {
  console.log(`Express app running on port ${PORT}`);
  console.log(`API docs at http://localhost:${PORT}/api-docs`);
});
