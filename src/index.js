const express = require("express")
const screaperTiktok =  require("./tiktok")

const app = express();
const port = 3000;
app.get('/', async (req, res) => {
    const { user } = req.query
    res.status(200).json(await screaperTiktok(user))
  })

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })