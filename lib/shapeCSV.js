require("dotenv").config();
const fs = require("fs");
let urlList = fs
  .readFileSync(`input/${process.env.CSV_FILE_NAME}.csv`, "utf8")
  .split("\n");

const data = [];

for (let i = 1; i < urlList.length - 1; i++) {
  const urlRecord = urlList[i].split(",");
  data.push({
    deviceType: urlRecord[0].replace(/\"/g, ""),
    url: urlRecord[1].replace(/\"/g, ""),
    pageName: urlRecord[2].replace(/\"/g, ""),
    login: urlRecord[3].replace(/\"/g, ""),
    loginAccount: urlRecord[4].replace(/\"/g, ""),
    loginPassword: urlRecord[5].replace(/\"/g, ""),
    loginPage: urlRecord[6].replace(/\"/g, ""),
    loginAccountForm: urlRecord[7].replace(/\"/g, ""),
    loginPasswordForm: urlRecord[8].replace(/\"/g, ""),
    loginBtnForm: urlRecord[9].replace(/\"/g, "")
  });
}

fs.writeFileSync(
  `input/${process.env.CSV_FILE_NAME}.json`,
  JSON.stringify(data),
  "utf8"
);
