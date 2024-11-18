import cors from "cors";
import express from "express";
import requestIp from "request-ip";
import { logRequestResponse } from "./middleware/logger/logger-middleware";
import router from "./routes/index";
import env from "./env";

import swaggerUi from "swagger-ui-express";
import { helpCheck } from "./utils/helpCheck";
import swaggerDocument from "./swagger-output.json";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestIp.mw());

app.use(logRequestResponse);

app.get("/", helpCheck);
app.use(`${env.BASE_PATH}/v1`, router);
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default app;
