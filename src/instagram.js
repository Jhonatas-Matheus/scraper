const { response } = require('express');
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

puppeteer.use(StealthPlugin());

const handleLoginInstagram = async (page) => {
  await page.goto('https://www.instagram.com/');
  await page.waitForSelector('input')
  await page.type('input[type="text"]', 'dixx.jhonatas02')
  await page.type('input[type="password"]','12132830Jm')
  await page.click('button[type="submit"]');
  await page.waitForNavigation()

}

const handleGetData = async (page, username) =>{
  const apiUrl = `https://www.instagram.com/${username}/?__a=1&__d=dis`;
    await page.goto(apiUrl)
    try {
      await page.waitForSelector('pre')
      const result = await page.$eval('pre', (element)=> {
        console.log(element)
        return element.innerText
      })
      let response = {
        username: JSON.parse(result)["graphql"]["user"]["username"],
        followers_count: JSON.parse(result)["graphql"]["user"]["edge_followed_by"]["count"],
        following_count: JSON.parse(result)["graphql"]["user"]["edge_follow"]["count"],
        post_count: JSON.parse(result)["graphql"]["user"]["edge_owner_to_timeline_media"]["count"]
      }
      const posts = JSON.parse(result)["graphql"]["user"]["edge_owner_to_timeline_media"]["edges"].map(post => {
        const node = post.node;
        const isVideo = node.is_video;
        const likesCount = node.edge_liked_by.count;
        const commentsCount = node.edge_media_to_comment.count;
        const viewsCount = isVideo ? node.video_view_count : undefined;
      
        return {
          isVideo,
          likesCount,
          commentsCount,
          viewsCount,
        };
      });
      response['posts'] = posts
      return response  
    } catch (error) {
      console.log('Não foi possível scrapar os dados de: ' + username)
      console.log(error)
      return null
    }
    
}

const scraperInstagram = async (usernames) => {
  let arrayResponse = []
  const browser = await puppeteer.launch({
    // headless: 'new',
    headless: false,
    defaultViewport: null,
    args: ["--no-sandbox", "--unlimited-storage"],
    // executablePath: "/usr/bin/google-chrome-stable",
  });
  const page = await browser.newPage();
  await handleLoginInstagram(page)
  for (const username of usernames) {
    const result = await handleGetData(page,username);
    if(result !== null){
      arrayResponse.push(result);
    }
  }
  // const data = usernames.map(async (user) => {
  //   const response = await handleGetData(page, user)
  //   return response
  // } )
  // const response = await Promise.all(data)
  await browser.close();
  return arrayResponse
  
}

module.exports = scraperInstagram;