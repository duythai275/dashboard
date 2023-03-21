const jsonfile = require("jsonfile");
require("dotenv/config");
const { VITE_APP_NAME, VITE_APP_ICON } = process.env;
const manifest = require("./manifest.webapp.json");
manifest.name = VITE_APP_NAME;
manifest.description = VITE_APP_NAME;
if (VITE_APP_ICON) {
  manifest.icons["16"] = VITE_APP_ICON;
  manifest.icons["48"] = VITE_APP_ICON;
  manifest.icons["128"] = VITE_APP_ICON;
}
jsonfile.writeFileSync("./dist/manifest.webapp", manifest);
