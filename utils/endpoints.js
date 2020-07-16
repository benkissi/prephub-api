const TORRE = {
    GET_USER: (username) => `https://torre.bio/api/bios/${username}`,
    GET_JOBS: (offset, size, aggregate) => `https://search.torre.co/opportunities/_search/?offset=${offset}&size=${size}&aggregate=${aggregate}`,
    GET_JOB_DETAILS: (id) => `https://torre.co/api/opportunities/${id}`
}

module.exports = {
    TORRE
}