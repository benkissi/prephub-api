const express = require("express");
const User = require("../models/user");
const router = new express.Router();
const auth = require("../middlewares/authenticate");

router.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = new User({
      email,
      password,
    });

    const token = await user.generateAuthToken();
    await user.save();
    res.status(201).json({user, token})
    
  } catch (error) {
   return res.status(400).json(error);
  }
});

router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

      const user = await User.findByCredentials(email, password)
      const token = await user.generateAuthToken()

    res.status(200).json({user, token})

  } catch (error) {
    return res.status(400).send(error);
  }
});

router.get("/users/logout", auth, async (req, res) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    req.user.tokens = req.user.tokens.filter((item) => {
      return item.token !== token;
    });

    await req.user.save();

    res.send(true);
  } catch (error) {
    res.status(500).send();
  }
});

module.exports = router;