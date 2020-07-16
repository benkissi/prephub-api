const express = require("express");
const axios = require("axios");
const router = new express.Router();
const auth = require("../middlewares/authenticate");
const {addMatchStatus} = require('../utils/funcs')

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

    const jobsList = jobs.data.results
    const strengths = user.data.strengths

    const updatedJobs = addMatchStatus(jobsList, strengths)
    console.log('udatedJos', updatedJobs)

    jobs.data.results = updatedJobs


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

    const data = jobs.data

    const updatedJobs = addMatchStatus(data.results, strengths)
    console.log('udatedJos', updatedJobs)

    data.results = updatedJobs
    
    res.send(data);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});

router.post("/job-details", auth, async (req, res) => {
  try {
    const { id } = req.body;

    const detailsURL = TORRE.GET_JOB_DETAILS(id);
    const details = await axios.get(
      detailsURL,
      {},
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = details.data

    console.log('********data', data)
    
    res.send(data);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});


(id) => ``

module.exports = router;
