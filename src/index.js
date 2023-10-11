const express = require("express")
const scraperTiktok =  require("./tiktok")
const screaperInstatram = require("./instagram")
const getDataChannel = require("./youtube")
const timeoutMillis = 5 * 60 * 1000;
const app = express();
const port = 3000;
app.get('/tiktok', async (req, res) => {
    const { user } = req.query
    const response = await scraperTiktok(user)
    res.status(200).json(response)

  })

app.get('/instagram', async (req, res) => {
  const { user } = req.query
  const response = await screaperInstatram(user)
  res.status(200).json(response)

})

app.get('/youtube', async (req, res) => {
  const { user } = req.query
  const response = await getDataChannel(user)
  res.status(200).json(response)

})

  app.listen(port, () => {
    console.log(`Aplicação rodando na porta ${port}`)
  })