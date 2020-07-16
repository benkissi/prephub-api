const TORRE = {
    GET_USER: (username) => `https://torre.bio/api/bios/${username}`,
    GET_JOBS: (offset, size, aggregate) => `https://search.torre.co/opportunities/_search/?offset=${offset}&size=${size}&aggregate=${aggregate}`
}

module.exports = {
    TORRE
}