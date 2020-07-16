const express = require("express");
const axios = require("axios");
const router = new express.Router();
const auth = require("../middlewares/authenticate");

const { TORRE } = require("../utils/endpoints");

router.post("/matching", auth, async (req, res) => {
  try {
    const { username } = req.body;
    console.log("username", username);
    const url = TORRE.GET_USER(username);
    const user = await axios.get(url);
    console.log("user", user.data);
    const data = {
      bio: user.data
    }
    res.send(data)
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});


module.exports = router