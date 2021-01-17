const express = require('express')
const router = express.Router()

router.get('/', async (req, res) => {
  res.status(200).send("Client");
})

router.post('/upload', async (req, res) => {
  //console.log(req.body);
  res.status(200).send({message: "OK"});
})

module.exports = router;