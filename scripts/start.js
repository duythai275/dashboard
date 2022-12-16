import * as dotenv from "dotenv";
import fs from "fs";
dotenv.config();
const { VITE_CONFIG_NAME } = process.env;
if (!fs.existsSync("./src/config")) {
  fs.mkdirSync("./src/config");
}
fs.cpSync(`./configs/${VITE_CONFIG_NAME}/frontend`, "./src/config", { recursive: true });
