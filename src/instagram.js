// const puppeteer = require("puppeteer");
const puppeteer = require('puppeteer-extra')
// const puppeteer = require('puppeteer-core')
// const puppeteer = require("puppeteer");
const axios = require('axios')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
const Signer = require("tiktok-signature");
puppeteer.use(StealthPlugin());
const { user } = require("instatouch")

const screaperInstatram = async (profile_name) =>{
  function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
  }
    const urlInstagram = `https://www.instagram.com/${profile_name}`;
    const browser = await puppeteer.launch({
      headless: true,
      defaultViewport: null,
      args: ["--no-sandbox", "--unlimited-storage"],
      executablePath: "/usr/bin/google-chrome-stable",
      });
    
      const page = await browser.newPage();
    
      await page.goto(urlInstagram);
      await page.waitForSelector("._ac2a")
    
      const userData = {}
    
      const elements = await page.$$eval("._ac2a",(elementos)=>{
        console.log(elementos)
        return elementos.map((element)=> element.textContent)
      });
      
      await page.mouse.move(getRandomIntInclusive(0,500),getRandomIntInclusive(0,500));
      
      if (elements.length >= 3) {
        userData.posts = elements[0];
        userData.followers = elements[1];
        userData.following = elements[2];
        const listPosts = await user(profile_name,{
          count: parseFloat(userData.posts)
        })
        userData.listOfPosts = listPosts.collector;
    
      }
      console.log(userData);
      return userData

}

module.exports = screaperInstatram;