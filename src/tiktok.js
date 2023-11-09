const puppeteer = require('puppeteer-extra')
const axios = require('axios')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
const Signer = require("tiktok-signature");

puppeteer.use(StealthPlugin());

let userDetailsUrl = '';
let objectUser;
let arrayResponse = [];





const scraperTiktok = async (username) => {
  const browser = await puppeteer.launch({
    headless: 'new',
    // headless: false,
    defaultViewport: null,
    args: ["--no-sandbox", "--unlimited-storage"],
    // executablePath: "/usr/bin/google-chrome-stable",
  });
  const page = await browser.newPage();
  await page.setRequestInterception(true);
  let urlUserInfo = new Promise (async(resolve)=>{
    let importantUrls = {};
    page.on('request', async (request) => {
      if(request.url().includes('https://www.tiktok.com/api/user/detail/')){
        importantUrls['userInfo'] = request.url()
      }
      if(request.url().includes('https://www.tiktok.com/api/post/item_list/')){
        importantUrls['userVideos'] = request.url()
      }
      if(importantUrls.hasOwnProperty('userInfo') && importantUrls.hasOwnProperty('userVideos')){
        resolve(importantUrls)
      }
      request.continue();
    });
  })
  const fetchData = () => {
    return new Promise(async (resolve, reject) => {
      await page.goto((await urlUserInfo).userInfo);
      await page.waitForSelector('pre');
      const objectUser = await page.$eval('pre', (el) => {
        return el.innerText;
      });
      const currentUser = JSON.parse(objectUser).userInfo
      const condensedUser = {
        nickname: currentUser.user.nickname,
        avatarThumb: currentUser.user.avatarThumb,
        secUid: currentUser.user.secUid,
        signature: currentUser.user.signature,
        uniqueId: currentUser.user.uniqueId,
        verified: currentUser.user.verified,
        diggCount: currentUser.stats.diggCount,
        followerCount: currentUser.stats.followerCount,
        followingCount: currentUser.stats.followingCount,
        friendCount: currentUser.stats.friendCount,
        heartCount: currentUser.stats.heartCount,
        videoCount: currentUser.stats.videoCount
      }
      const videosList = await scraperTiktokVideosV2(page, (await urlUserInfo).userVideos, username, condensedUser.videoCount)
      condensedUser.videos = videosList
      if(condensedUser.videos === null){
        console.log('Ocorreu um erro ao tentar realizar o scraper de ' + username)
        resolve()
      }else{
        console.log(username + ' Dados coletado com sucesso')
        resolve(condensedUser)
      }
      await browser.close();
    });
   }

  await page.goto(`https://www.tiktok.com/@${username}`);
  try{
    await page.waitForSelector('.css-1osbocj-DivErrorContainer',{timeout: 3000})
    console.log('O usuário ' + username + ' não existe ou é privado')
    return 'O usuário ' + username + ' não existe ou é privado'
  }
  catch(error){
    await page.reload();
    return await fetchData()

  }

 
  
};
const scraperTiktokVideosV2 = async (page,urlUserVideos,name,videoCount) => {
  await page.goto(urlUserVideos)
  await page.waitForSelector('pre')
  const userVideos = await page.$eval('pre', (el) => {
    return el.innerText;
  });
  try {
    if(videoCount === 0){
      return []
    }
    const userVideosArray = JSON.parse(userVideos).itemList
    if(userVideosArray.length > 0){
      const condensedUserVideo = userVideosArray.map((video)=>{
        const {stats, desc } = video
        return {...stats, desc}
      })
    return condensedUserVideo
  }    
  } catch (error) {
    console.log('Ocorreu o seguinte erro ao tentar carregar os vídeos de ' + name + ':')
    console.log(error)
    return null
  }
  
  
}

module.exports = scraperTiktok;


