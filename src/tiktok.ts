    // const closeAntibot = async () => {
  //   let modalBot;
  //   try {
  //       modalBot = await page.$eval(".captcha_verify_bar--close",(elemento)=>{
  //           return elemento;
  //       })
  //   } catch (error) {
  //       console.log(error)
  //       console.log(`--------`)
  //       console.log('Caiu no erro')
  //       modalBot = undefined;
  //   }
  //   if(modalBot){
  //       console.log('Caiu no if do modal bot')
  //       page.click(".captcha_verify_bar--close");
  //   }
  // }
  // closeAntibot()
  // setInterval(()=>{
  //   closeAntibot()
  // }, 5000)
  
  // await page.waitForSelector("._aagw")
  // await page.hover("_aagw")
  // Código com o seletor para o tiktok.
  // const elements = await page.$$eval(".tiktok-ntsum2-DivNumber > strong",(elementos)=>{
  //   return elementos.map((element)=> element.textContent)
  // });
  // console.log(elements)