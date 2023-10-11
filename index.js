const puppeteer = require('puppeteer');


// // FUNCAO QUE PEGA O ID DO CANAL
async function getIdChannel() {
  const browser = await puppeteer.launch({
    executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    headless:false
  });
  const page = await browser.newPage();
  await page.goto('https://www.youtube.com/@anitta/videos');

  page.waitForSelector("meta[property='og:url']");

  const idChannel = await page.$eval("meta[property='og:url']", (element) => {
      return element.content;
    }
  );

    await browser.close();
    return idChannel.slice(32)
}


// FUNCAO QUE PEGA OS DADOS DO CANAL
async function getDataChannel() {
  try {
    const response = await fetch(`https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${await getIdChannel()}&key=AIzaSyA3JFFDcsVMNJslBsYfW5nGScFh33VJBgc`);
    const json = await response.json();
    function dateChannel()
        { 
          this.idPlaylist = json.items[0].contentDetails.relatedPlaylists.uploads;
          this.videoCount = json.items[0].statistics.viewCount;
          this.viewCount = json.items[0].statistics.viewCount;
          this.subscriberCount = json.items[0].statistics.subscriberCount;
        }

      var dataChannel = new dateChannel();

      let idPl = await dataChannel.idPlaylist;
     dataChannel.videos = await getDataVideos(await idPl);
      
     console.dir(dataChannel, {depth:null});
     return dataChannel;
  } catch (error) {
    console.log(error)
  }
  
}




// FUNCAO QUE PEGA OS IDS DOS VIDEOS
async function getIdsVideos(idPl) {
  try {
    let idVideos = [];
    const response = await fetch(`https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&maxResults=50&playlistId=${await idPl}&key=AIzaSyA3JFFDcsVMNJslBsYfW5nGScFh33VJBgc`);
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
    const response = await fetch(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${await getIdsVideos(await idPl)}&key=AIzaSyA3JFFDcsVMNJslBsYfW5nGScFh33VJBgc`);
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



getDataChannel();



// async function getIdsVideos() {
//   const browser = await puppeteer.launch({
//     executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
//     headless:false
//   });
//   const page = await browser.newPage();
//   await page.goto('https://www.youtube.com/@thiagofreitascantoroficial/videos');

//   page.waitForSelector("a[id='video-title-link']");
//   const idsVideos = await page.$$eval("a[id='video-title-link']", (elements) => {
//       return elements.map((element) => {
//         return element.href.slice(32);
//       })
//     }
//   );
//     // await browser.close();
//     console.log(idsVideos);

//     function concatenarComPercent(vetor) {
//       if (vetor.length === 0) {
//         return ""; // Retorna uma string vazia se o vetor estiver vazio
//       }
//       const resultado = vetor.join("%2C");
//       return resultado;
//     }
//     const resultadoConcatenado = concatenarComPercent(idsVideos);
//     console.log(resultadoConcatenado); 
//     return resultadoConcatenado;
// }
// getIdsVideos();