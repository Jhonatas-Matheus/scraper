// const puppeteer = require('puppeteer');
const userAgent = require('user-agents');
const puppeteer = require('puppeteer-extra')
const axios = require('axios')

// add stealth plugin and use defaults (all evasion techniques)
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
const fs = require("fs");

let userDetailsUrl = '';
puppeteer.use(StealthPlugin());


(async () => {
  const browser = await puppeteer.launch({
    
    executablePath:
      "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    headless: false,
  });
  const page = await browser.newPage();

  await page.setRequestInterception(true);
  page.on('request', async (request) => {
    
    // console.log('Intercepted request URL:', request.url());
    if(request.url().includes('https://www.tiktok.com/api/user/detail/')){

    }
    // Você pode tomar decisões com base na URL da requisição ou fazer o que for necessário aqui
    request.continue(); // Continua a requisição
  });

  page.on('response', async (response) => {
     if(response.url().includes('https://www.tiktok.com/api/user/detail/')){
      console.log(response.status())
      setTimeout(async()=>{
        console.log('Chamou o set timoeout')
        const reseponseTeste = await response.buffer();
        reseponseTeste.json()
        console.log(reseponseTeste);
      },2000)

     }
  
    // Você pode acessar os detalhes da resposta aqui, se necessário
  });

  await page.goto('https://www.tiktok.com/@juliakbarni');
  await page.reload()
  // await browser.close();

})();
