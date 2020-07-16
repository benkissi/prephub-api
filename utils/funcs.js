const addMatchStatus = (jobs, strengths) => {
    return jobs.map((job) => {
      let match={status: false, strengths: []}
      const jobSkills = job.skills
      if(jobSkills.length){
        jobSkills.forEach((skill) => {
          const strengthNameLowercase = strengths.map((strength) => strength.name.toLowerCase())
          const contains = strengthNameLowercase.includes(skill.name.toLowerCase())
          if(contains){
            match = {
              status: true,
              strengths: [...match.strengths, skill.name]

            }
          }
        })
      }
      job.match = match
      return job
    })
  }

  module.exports = {
    addMatchStatus: addMatchStatus
  }