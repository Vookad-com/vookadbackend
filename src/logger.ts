import { createLogger, transports, format } from "winston";


// Define log levels (you can customize these)
const logger = createLogger({
    level: "info",
    format: format.json(),
    transports: [new transports.Console()],
  });
  
logger.add(new transports.File({ filename: "my-logs.log" }));

export default logger;
