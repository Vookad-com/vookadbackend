"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
// Define log levels (you can customize these)
const logger = (0, winston_1.createLogger)({
    level: "info",
    format: winston_1.format.json(),
    transports: [new winston_1.transports.Console()],
});
logger.add(new winston_1.transports.File({ filename: "my-logs.log" }));
exports.default = logger;
