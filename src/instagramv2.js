const axios = require('axios');
const fs = require('fs');
const cheerio = require('cheerio');
const headers = {
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
  'Accept-Encoding': 'gzip, deflate, br',
  'Accept-Language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7',
  'Cache-Control': 'max-age=0',
  'Cookie': 'tt_chain_token=hsSgN7ppEzQU4o5oIlmyzQ==; tiktok_webapp_theme=light; passport_csrf_token=d25f4db6c062173b8ddf20c5b4832d8a; ... (seus cookies aqui)',
  'Sec-Ch-Ua': '"Chromium";v="118", "Google Chrome";v="118", "Not=A?Brand";v="99"',
  'Sec-Ch-Ua-Mobile': '?0',
  // 'Sec-Ch-Ua-Platform': '"macOS"',
  'Sec-Fetch-Dest': 'document',
  'Sec-Fetch-Mode': 'navigate',
  'Sec-Fetch-Site': 'none',
  'Sec-Fetch-User': '?1',
  'Upgrade-Insecure-Requests': '1',
  'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36',
};
(async()=>{
  // const htmlInstagram = await axios.get('https://www.instagram.com/jeffersonthawan/')
  const teste = await axios.get('https://www.tiktok.com/api/user/detail/?WebIdLastTime=1696447108&aid=1988&app_language=pt-BR&app_name=tiktok_web&browser_language=pt-BR&browser_name=Mozilla&browser_online=true&browser_platform=MacIntel&browser_version=5.0%20%28Macintosh%3B%20Intel%20Mac%20OS%20X%2010_15_7%29%20AppleWebKit%2F537.36%20%28KHTML%2C%20like%20Gecko%29%20Chrome%2F118.0.0.0%20Safari%2F537.36&channel=tiktok_web&cookie_enabled=true&device_id=7286184821032846853&device_platform=web_pc&focus_state=true&from_page=user&history_len=5&is_fullscreen=false&is_page_visible=true&language=pt-BR&os=mac&priority_region=&referer=&region=BR&screen_height=900&screen_width=1440&secUid=MS4wLjABAAAAszX76b0v7V33xyD_CqFZYYrCwPglJDrQfxlPfv4ZPYL9px6-BHALi6sykTGkWMer&tz_name=America%2FFortaleza&uniqueId=juliakbarni&webcast_language=pt-BR&msToken=jF7IFdKVSJG0K1FHN163uPUMHppvgxpbUvLC5dSxbaw4evdY-VbVANdaVO35u88sxfsGaI6Qn47aDUZjxPBzyzb5jQ5Xc4pSkeUu-Ivcxh15p1a_YyvgL8aQABv7inf3g7Sotso=&X-Bogus=DFSzswVOuotANHhLtF2irU9WcBJS&_signature=_02B4Z6wo00001gZ8zmQAAIDCBnzOZhYLJN4GfMrAAOTr20',{
    headers: headers
  })
  const testeData = teste.data
  console.log(testeData)
})()

