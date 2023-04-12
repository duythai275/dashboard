require("dotenv").config();
const fs = require("fs");
const zip = require("bestzip");
const { VITE_CONFIG_NAME } = process.env;
const dir = "./deploy";
const distDir = "./dist";
if (fs.existsSync(dir)) {
  fs.rmSync(dir, { recursive: true, force: true });
}
fs.mkdirSync(dir);
fs.cpSync(distDir, dir, { recursive: true });
fs.cpSync("./server", dir + "/server/", { recursive: true });
fs.cpSync("./.env", dir + "/.env");
fs.cpSync(`./configs/${VITE_CONFIG_NAME}/backend/`, dir + `/server/src/`, { recursive: true });
fs.cpSync(`./configs/${VITE_CONFIG_NAME}/backend/`, dir + `/server/src/`, { recursive: true });
fs.renameSync(dir + `/server/src/apiConfig.js`, dir + `/server/src/dashboardApi.js`);
fs.appendFileSync(dir + "/.env", "\r\nVITE_APP_MODE=production");
fs.cpSync("./bundle-package.json", dir + "/package.json");
zip({
  source: ["*", ".env"],
  destination: `./bundle.zip`,
  cwd: "deploy/"
})
  .then(function () {
    console.log("all done!");
  })
  .catch(function (err) {
    console.error(err.stack);
    process.exit(1);
  });
``;
