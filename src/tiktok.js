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
    executablePath: "/usr/bin/google-chrome-stable",
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

  await page.goto(`https://www.tiktok.com/@${username}`);
  await page.reload();

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
      const videosList = await scraperTiktokVideosV2(page, (await urlUserInfo).userVideos, username)
      condensedUser.videos = videosList
      resolve(condensedUser)
      await browser.close();
  });
};

const scraperTiktokVideos = async (userInfo, cursor) => {
  const { secUid } = userInfo;
  // We use Apple, based on the issue comments in the repo, this helps prevent TikTok's captcha from triggering
  const TT_REQ_USER_AGENT =
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36 Edg/107.0.1418.56";

  // This the final URL you make a request to for the API call, it is ALWAYS this, do not mistaken it for the signed URL
  const TT_REQ_PERM_URL =
    "https://www.tiktok.com/api/post/item_list/?aid=1988&app_language=en&app_name=tiktok_web&battery_info=1&browser_language=en-US&browser_name=Mozilla&browser_online=true&browser_platform=Win32&browser_version=5.0%20%28Windows%20NT%2010.0%3B%20Win64%3B%20x64%29%20AppleWebKit%2F537.36%20%28KHTML%2C%20like%20Gecko%29%20Chrome%2F107.0.0.0%20Safari%2F537.36%20Edg%2F107.0.1418.56&channel=tiktok_web&cookie_enabled=true&device_id=7165118680723998214&device_platform=web_pc&focus_state=true&from_page=user&history_len=3&is_fullscreen=false&is_page_visible=true&os=windows&priority_region=RO&referer=&region=RO&screen_height=1440&screen_width=2560&tz_name=Europe%2FBucharest&webcast_language=en&msToken=G3C-3f8JVeDj9OTvvxfaJ_NppXWzVflwP1dOclpUOmAv4WmejB8kFwndJufXBBrXbeWNqzJgL8iF5zn33da-ZlDihRoWRjh_TDSuAgqSGAu1-4u2YlvCATAM2jl2J1dwNPf0_fk9dx1gJxQ21S0=&X-Bogus=DFSzswVYxTUANS/JS8OTqsXyYJUo&_signature=_02B4Z6wo00001CoOkNwAAIDBCa--cQz5e0wqDpRAAGoE8f";

    const PARAMS = {
      aid: "1988",
      count: 30,
      secUid: secUid,
      cursor: cursor,
      cookie_enabled: true,
      screen_width: 0,
      screen_height: 0,
      browser_language: "",
      browser_platform: "",
      browser_name: "",
      browser_version: "",
      browser_online: "",
      timezone_name: "Europe/London",
    };
    const essentials = new Promise(async(resolve)=>{
      const signer = new Signer(null, TT_REQ_USER_AGENT);
      await signer.init();
    
      const qsObject = new URLSearchParams(PARAMS);
      const qs = qsObject.toString();
    
      const unsignedUrl = `https://m.tiktok.com/api/post/item_list/?${qs}`;
      const signature = await signer.sign(unsignedUrl)
      const navigator = await signer.navigator();
      resolve({
        signature,
        navigator
      })
      await signer.close();
    })
   
  
    // We don't take the `signed_url` from the response, we use the `x-tt-params` header instead because TikTok has
    // some weird security considerations. I'm not sure if it's a local encode or they actually make a call to their
    // servers to get the signature back, but your API call params are in the `x-tt-params` header, which is used
    // when making the request to the static URL `TT_REQ_PERM_URL` above. I'm assuming because the library launches
    // a headless browser, it's a local encode.
    const essentialData = await essentials

    const { "x-tt-params": xTtParams } = await essentialData.signature;
    const { user_agent: userAgent } = await essentialData.navigator;
  
    const res = await testApiReq({ userAgent, xTtParams });
    const { data } = res;
    // console.log(data);

async function testApiReq({ userAgent, xTtParams }) {
  const options = {
    method: "GET",
    headers: {
      "user-agent": userAgent,
      "x-tt-params": xTtParams,
    },
    url: TT_REQ_PERM_URL,
  };
  return axios(options);
}
return data;
}

const scraperTiktokVideosV2 = async (page,urlUserVideos,name) => {
  await page.goto(urlUserVideos)
  await page.waitForSelector('pre')
  const userVideos = await page.$eval('pre', (el) => {
    return el.innerText;
  });
  const userVideosArray = JSON.parse(userVideos).itemList
  if(userVideosArray.length > 0){
    const condensedUserVideo = userVideosArray.map((video)=>{
      const {stats, desc } = video
      return {...stats, desc}
    })
    return condensedUserVideo
  }
  console.log('Não carregou os vídeos de ' + name)
  
}
const verifyAndContinueScrapVideos = async (currentUser) =>{
  let continueCondition = true;
  let createTimeLastVideo = 0;
  let videosArray = []

  while (continueCondition === true) {
    // console.log('Caiu no while')
    let videosResponse = await scraperTiktokVideos(currentUser,createTimeLastVideo)
    if(videosResponse.itemList){
      videosResponse.itemList.forEach((video)=>{
        const { stats, desc } = video
        videosArray.push({...stats, desc})
      })
      createTimeLastVideo = videosResponse.itemList[videosResponse.itemList.length - 1].createTime * 1000
      // console.log(createTimeLastVideo)
    }
    if(!videosResponse.hasMore || videosArray.length >= 30){
      continueCondition = false
    }
  }
  return videosArray
}

module.exports = scraperTiktok;


