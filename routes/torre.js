const express = require("express");
const axios = require("axios");
const router = new express.Router();
const auth = require("../middlewares/authenticate");

const { TORRE } = require("../utils/endpoints");

router.post("/matching", auth, async (req, res) => {
  try {
    const { username } = req.body;

    const url = TORRE.GET_USER(username);
    const jobsURL = TORRE.GET_JOBS(0, 10, true);

    const user = await axios.get(url);
    const jobs = await axios.post(
      jobsURL,
      {},
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = {
      bio: user.data,
      jobs: jobs.data,
    };
    res.send(data);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});

router.post("/next-jobs", auth, async (req, res) => {
  try {
    const { offset, size, aggregate, strengths } = req.body;
    console.log(offset, size, aggregate)

    const jobsURL = TORRE.GET_JOBS(offset, size, aggregate);
    const jobs = await axios.post(
      jobsURL,
      {},
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    
    res.send(jobs.data);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});

module.exports = router;
