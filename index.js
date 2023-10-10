const puppeteer = require('puppeteer');


// // FUNCAO QUE PEGA O ID
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
getIdChannel();

// FUNCAO QUE PEGA OS DADOS DOS CANAL
async function fetchData() {
  try {
    const response = await fetch(`https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${await getIdChannel()}&key=AIzaSyA3JFFDcsVMNJslBsYfW5nGScFh33VJBgc`);
    const json = await response.json();
    function dados()
        { 
          this.uploads = json.items[0].contentDetails.relatedPlaylists.uploads;
          this.videoCount = json.items[0].statistics.viewCount;
          this.viewCount = json.items[0].statistics.viewCount;
          this.subscriberCount = json.items[0].statistics.subscriberCount;
        }
      var dataChannel = new dados(); // momento de criação do JSON
      
     console.dir(dataChannel, {depth:null});
     return dataChannel;
  } catch (error) {
    console.log(error)
  }
  
}


let uploads = fetchData().then((res)=>{
  return res.uploads
})


// FUNCAO QUE PEGA OS IDS DOS VIDEOS
let idVideos = [];
async function getIdsVideos() {
  try {
    
    const response = await fetch(`https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&maxResults=50&playlistId=${await uploads}&key=AIzaSyA3JFFDcsVMNJslBsYfW5nGScFh33VJBgc`);
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
async function getDataVideos() {
  try {
    const response = await fetch(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${await getIdsVideos()}&key=AIzaSyA3JFFDcsVMNJslBsYfW5nGScFh33VJBgc`);
    const json = await response.json();
    const videosData = []

    json.items.map((e) => {

      function clearData()
        { 
          this.title = e.snippet.title,
          this.statistics = e.statistics
        }
       var dataChannel = new clearData(); 

      videosData.push(dataChannel)
    })

     console.dir(videosData, {depth:null});
  } catch (error) {
    console.log(error)
  }
  
}

getDataVideos();

















// FUNCAO QUE PEGA O IDVIDEO
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