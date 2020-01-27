require("dotenv").config();
const puppeteer = require("puppeteer");
const devices = require("puppeteer/DeviceDescriptors");
const fs = require("fs");
const tmpfile = fs.readFileSync(
  `input/${process.env.CSV_FILE_NAME}.json`,
  "utf8"
);
const urlList = JSON.parse(tmpfile);

async function scrollToBottom(page, viewportHeight) {
  const getScrollHeight = () => {
    return Promise.resolve(document.documentElement.scrollHeight);
  };

  let scrollHeight = await page.evaluate(getScrollHeight);
  let currentPosition = 0;
  let scrollNumber = 0;

  while (currentPosition < scrollHeight) {
    scrollNumber += 1;
    const nextPosition = scrollNumber * viewportHeight;
    await page.evaluate(function(scrollTo) {
      return Promise.resolve(window.scrollTo(0, scrollTo));
    }, nextPosition);
    await page
      .waitForNavigation({ waitUntil: "networkidle2", timeout: 5000 })
      .catch(e => console.log("timeout exceed. proceed to next operation"));

    currentPosition = nextPosition;
    console.log(`scrollNumber: ${scrollNumber}`);
    console.log(`currentPosition: ${currentPosition}`);

    scrollHeight = await page.evaluate(getScrollHeight);
    console.log(`ScrollHeight ${scrollHeight}`);
  }
}

const sleep = msec => new Promise(resolve => setTimeout(resolve, msec));

(() => {
  urlList.forEach(async value => {
    await sleep(1000);

    const viewportHeight = 1200;
    const viewportWidth = 1600;
    const browser = await puppeteer.launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox"]
    });
    const page = await browser.newPage();

    if (value.deviceType === "pc") {
      await page.setViewport({ width: viewportWidth, height: viewportHeight });
    } else {
      // SPの画面サイズは「iPhone 5」を使用。
      await page.emulate(devices["iPhone 5"]);
    }

    if (value.login) {
      await page.goto(`${value.loginPage}`);

      // アカウント名とパスワードを入力
      await page.type(`${value.loginAccountForm}`, `${value.loginAccount}`);
      await page.type(`${value.loginPasswordForm}`, `${value.loginPassword}`);

      // ログインボタンをクリック
      await page.click(`${value.loginBtnForm}`);
    }

    await page.goto(value.url);
    await page
      .waitForNavigation({ waitUntil: "networkidle2", timeout: 5000 })
      .catch(e => console.log("timeout exceed. proceed to next operation"));

    if (value.deviceType === "pc") {
      await scrollToBottom(page, viewportHeight);
    }
    await page.screenshot({
      path: `output/${value.deviceType}_${value.pageName}.png`,
      fullPage: true
    });
    console.log(`save screenshot: ${value.url}`);

    await browser.close();
  });
})();
