require('dotenv').config();
const puppeteer = require('puppeteer');
const fs = require('fs');
const tmpfile = fs.readFileSync(`input/${process.env.CSV_FILE_NAME}.json`,'utf8');
const urlList = JSON.parse(tmpfile);

async function scrollToBottom(page, viewportHeight) {
  const getScrollHeight = () => {
    return Promise.resolve(document.documentElement.scrollHeight) }

  let scrollHeight = await page.evaluate(getScrollHeight)
  let currentPosition = 0
  let scrollNumber = 0

  while (currentPosition < scrollHeight) {
    scrollNumber += 1
    const nextPosition = scrollNumber * viewportHeight
    await page.evaluate(function (scrollTo) {
      return Promise.resolve(window.scrollTo(0, scrollTo))
    }, nextPosition)
    await page.waitForNavigation({waitUntil: 'networkidle2', timeout: 5000})
              .catch(e => console.log('timeout exceed. proceed to next operation'));

    currentPosition = nextPosition;
    console.log(`scrollNumber: ${scrollNumber}`)
    console.log(`currentPosition: ${currentPosition}`)

    scrollHeight = await page.evaluate(getScrollHeight)
    console.log(`ScrollHeight ${scrollHeight}`)
  }
}

(() => {
  urlList.forEach(async value => {
    const viewportHeight = 1200;
    const viewportWidth = 1600;
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();

    page.setViewport({width: viewportWidth, height: viewportHeight});

    if (value.login) {
      await page.goto(`${process.env.LOGIN_PAGE}`);

      // アカウント名とパスワードを入力
      await page.type(`${process.env.ACCOUNT}`, `${process.env.ACCOUNT_VALUE}`);
      await page.type(`${process.env.PASSWORD}`, `${process.env.PASSWORD_VALUE}`);

      // ログインボタンをクリック
      await page.click(`${process.env.LOGIN_BTN}`);
    }

    await page.goto(value.url);
    await page.waitForNavigation({waitUntil: 'networkidle2', timeout: 5000})
              .catch(e => console.log('timeout exceed. proceed to next operation'));

    await scrollToBottom(page, viewportHeight);
    await page.screenshot({path:`output/${value.pageName}.png`, fullPage: true});
    console.log(`save screenshot: ${value.url}`);

    await browser.close();
  });
})();
