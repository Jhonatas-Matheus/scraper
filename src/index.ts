import puppeteer, { EvaluateFunc, Mouse, Page } from "puppeteer";
import * as fs from "fs";
import { user } from "instatouch"
import { PostCollector } from "instatouch/build/types";

function getRandomIntInclusive(min:number, max:number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}

type UserData = {
    posts: string,
    followers: string,
    following: string,
    listOfPosts: PostCollector[]
}

const profile_name = `brunnoaraujo0`;
const urlInstagram = `https://www.instagram.com/${profile_name}`;
const urlTiktok = `https://www.tiktok.com/${profile_name}`;

(async () => {

  const browser = await puppeteer.launch({
    
    executablePath:
      "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    headless: true,
  });

  const page = await browser.newPage();

  await page.goto(urlInstagram);
  await page.waitForSelector("._ac2a")


  const html = await page.content();
  const userData = {} as UserData;

  const elements = await page.$$eval("._ac2a",(elementos)=>{
    console.log(elementos)
    return elementos.map((element)=> element.textContent)
  });
  
  await page.mouse.move(getRandomIntInclusive(0,500),getRandomIntInclusive(0,500));
  
  if (elements.length >= 3) {
    userData.posts = elements[0] as string;
    userData.followers = elements[1] as string;
    userData.following = elements[2] as string;
    const listPosts = await user(profile_name,{
      count:5
    })
    userData.listOfPosts = listPosts.collector;
    fs.writeFileSync("usuario_encontrado.txt", JSON.stringify(userData));

  }
  console.log(userData);
})();


