import puppeteer from "puppeteer";
import * as fs from "fs";
type UserData = {
    posts: string,
    followers: string,
    following: string
}

const profile_name = `@reino_das_rimas`;
const urlInstagram = `https://www.instagram.com/${profile_name}`;
const urlTiktok = `https://www.tiktok.com/${profile_name}`;


(async () => {

  const browser = await puppeteer.launch({
    executablePath:
      "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    headless: false,
  });

  const page = await browser.newPage();

  await page.goto(urlTiktok);
//   await page.waitForTimeout(5000);

  const html = await page.content();
  const userData = {} as UserData;

//   const scrollScreen = async () => {
//     const scrollContainer = await page.$eval("body",(element)=>{
//         element.scrollTo({top: 300})
//     })
//   }
  const closeAntibot = async () => {
    let modalBot;
    try {
        modalBot = await page.$eval(".captcha_verify_bar--close",(elemento)=>{
            return elemento;
        })
    } catch (error) {
        console.log(error)
        console.log(`--------`)
        console.log('Caiu no erro')
        modalBot = undefined;
    }
    if(modalBot){
        console.log('Caiu no if do modal bot')
        page.click(".captcha_verify_bar--close");
    }
  }
  closeAntibot()
  setInterval(()=>{
    // scrollScreen()
    closeAntibot()
  }, 5000)

//   const elements = await page.$$eval("._ac2a",(elementos)=>{
//     return elementos.map((element)=> element.textContent)
//   });
  const elements = await page.$$eval(".tiktok-ntsum2-DivNumber > strong",(elementos)=>{
    return elementos.map((element)=> element.textContent)
  });
  console.log(elements)
  if (elements.length >= 3) {
    userData.posts = elements[0] as string;
    userData.followers = elements[1] as string;
    userData.following = elements[2] as string;
  }
  console.log(userData);
    fs.writeFileSync("pagina.html", html);

  //   await browser.close();

  //   console.log('Código HTML da página puxado com sucesso!');
})();


