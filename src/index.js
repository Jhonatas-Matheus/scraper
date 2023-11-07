const express = require("express")
const scraperTiktok =  require("./tiktok")
const scraperInstagram = require("./instagram")
const getDataChannel = require("./youtube");
const { user } = require("instatouch");
const timeoutMillis = 5 * 60 * 1000;
const app = express();
const port = 3000;
const fs = require('fs');
const { stringify } = require("querystring");
app.use(express.json());

const readAndAppendData = (fileName, newData) => {
  fs.readFile(fileName, 'utf8', (err, data) => {
    if (err) {
      // Se o arquivo não existir, crie um novo com os novos dados
      const initialData = { users: [] };
      initialData.users.push(newData);
      fs.writeFile(fileName, JSON.stringify(initialData, null, 2), (err) => {
        if (err) {
          console.error('Erro ao criar o arquivo JSON:', err);
        } else {
          console.log('Arquivo JSON criado com sucesso.');
        }
      });
    } else {
      // Se o arquivo existir, adicione os novos dados aos dados existentes
      const jsonData = JSON.parse(data);
      jsonData.users.push(newData);
      fs.writeFile(fileName, JSON.stringify(jsonData, null, 2), (err) => {
        if (err) {
          console.error('Erro ao escrever no arquivo JSON:', err);
        } else {
          console.log('Dados adicionados ao arquivo JSON com sucesso.');
        }
      });
    }
  });
};





app.post('/tiktok', async (req, res) => {
  let arrayResponse = [];
  console.log('Chamou a rota')
    const { users } = req.body
    // Solution 1:
    for (const username of users) {
      const result = await scraperTiktok(username);
      if(result !== null){
        arrayResponse.push(result);
      }
    }
    res.status(200).json(arrayResponse)
    // Solution 2: Broken when array or users contains more than 10 elements
    // const response = users.map(async (username)=>{
    //   const result = await scraperTiktok(username)
    //   arrayResponse.push(result)
    // })
    // res.status(200).json(await Promise.all(response))

    // Solution 3: 
    // const timesForExecute = (users.length / 6);
    // for (let i = 0; i < timesForExecute; i++) {
    //   const response = users.splice(0,6).map(async (username)=>{
    //     const result = await scraperTiktok(username)
    //     console.log(result.nickname)
    //     return result.nickname
    //   })
    //   const fetchData = await Promise.all(response)
    //   console.log(fetchData)
    //   arrayResponse.push(...fetchData)
    // }
    

    // res.status(200).json(arrayResponse)

  })

app.post('/instagram', async (req, res) => {
  console.log('Chamou a rota')
  const { users } = req.body
  const response = await scraperInstagram(users)
  // fs.writeFile('data_scraped_instagram.json', JSON.stringify(...response), (err)=> console.log(err))
  // readAndAppendData('data_scraped_instagram.json', ...response)
  res.status(200).json(response)

})

app.get('/youtube', async (req, res) => {
  console.log('Chamou a rota')
  const { user } = req.query
  const response = await getDataChannel(user)
  res.status(200).json(response)

})

  app.listen(port, () => {
    console.log(`Aplicação rodando na porta ${port}`)
  })