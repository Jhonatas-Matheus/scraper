const puppeteer = require('puppeteer-extra')
const axios = require('axios')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
const fs = require("fs");

let userDetailsUrl = '';
let objectUser;
puppeteer.use(StealthPlugin());


const screaperTiktok = async (username) => {
  const browser = await puppeteer.launch({
    // Se você estiver usando macbook descomente a linha abaixo:
    // executablePath:
    //   "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    headless: true,
  });
  const page = await browser.newPage();

  await page.setRequestInterception(true);
  page.on('request', async (request) => {
 
    if(request.url().includes('https://www.tiktok.com/api/user/detail/')){
      userDetailsUrl = request.url()
    }
    request.continue();
  });



  await page.goto(`https://www.tiktok.com/@${username}`);
  await page.reload();
  // await page.goto(userDetailsUrl);
  return new Promise(async (resolve, reject) => {
    setTimeout(async () => {
      await page.goto(userDetailsUrl);
      await page.evaluate(() => console.log('Testando o console'));
      await page.waitForSelector('pre');
      const objectUser = await page.$eval('pre', (el) => {
        return el.innerText;
      });
      resolve(JSON.parse(objectUser).userInfo);
      await browser.close();
    }, 2000);
  });
};
module.exports = screaperTiktok;
