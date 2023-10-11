const puppeteer = require('puppeteer');
require('dotenv').config()

// // FUNCAO QUE PEGA O ID DO CANAL
let displayIdChannel = '';
async function getIdChannel(profile_name) {
  const browser = await puppeteer.launch({
    executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  });
  const page = await browser.newPage();
  await page.goto(`https://www.youtube.com/@${profile_name}/videos`);

  page.waitForSelector("meta[property='og:url']");

  const idChannel = await page.$eval("meta[property='og:url']", (element) => {
      return element.content;
    }
  );
  displayIdChannel = idChannel.slice(32)
    await browser.close();
    return idChannel.slice(32)
}


// FUNCAO QUE PEGA OS DADOS DO CANAL
async function getDataChannel(profile_name) {
  try {
    const response = await fetch(`https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${await getIdChannel(profile_name)}&key=AIzaSyA3JFFDcsVMNJslBsYfW5nGScFh33VJBgc`);
    const json = await response.json();
    

    function dateChannel(){
        let dataChannel = {}
        Reflect.set(dataChannel, "idChannel", displayIdChannel)
        Reflect.set(dataChannel, "idPlaylist", json.items[0].contentDetails.relatedPlaylists.uploads)
        Reflect.set(dataChannel, "videoCount", json.items[0].statistics.viewCount)
        Reflect.set(dataChannel, "viewCount", json.items[0].statistics.viewCount)
        Reflect.set(dataChannel, "subscriberCount", json.items[0].statistics.subscriberCount)
        return dataChannel
    }
      var dataChannel = dateChannel();
      let idPl = dataChannel.idPlaylist;
      dataChannel.videos = await getDataVideos(await idPl);
      delete dataChannel.idPlaylist;
     return dataChannel;
  } catch (error) {
    console.log(error)
  }
  
}


// FUNCAO QUE PEGA OS IDS DOS VIDEOS
async function getIdsVideos(idPl) {
  try {
    let idVideos = [];
    const response = await fetch(`https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&maxResults=50&playlistId=${await idPl}&key=${process.env.YOUTUBE_API_KEY}`);
    const json = await response.json();


     json.items.map((e) =>{
      idVideos.push(e.contentDetails.videoId)
     })

     function concatenarComPercent(vetor) {
            if (vetor.length === 0) {
              return ""; // Retorna uma string vazia se o vetor estiver vazio
            }
            const resultado = vetor.join("%2C");
            return resultado;
      }
    const resultadoConcatenado = concatenarComPercent(idVideos);
    // console.log(resultadoConcatenado); 
    return resultadoConcatenado;
    // console.dir(json, {depth:null});
  } catch (error) {
    console.log(error)
  }
  
}



// FUNCAO QUE PEGA OS DADOS DOS VIDEOS
async function getDataVideos(idPl) {
  try {
    const response = await fetch(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${await getIdsVideos(await idPl)}&key=${process.env.YOUTUBE_API_KEY}`);
    const json = await response.json();
    const videosData = []
    json.items.map((e) => {

          var dataVideosChannel = new Object(); 
          dataVideosChannel.title = e.snippet.title,
          dataVideosChannel.statistics = e.statistics
          videosData.push(dataVideosChannel);
    })
     return videosData;
  } catch (error) {
    console.log(error)
  }
  
}

module.exports = getDataChannel;