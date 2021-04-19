const Axios = require('axios');

/**
 * Get HTML
 *
 * @param {string} url URL
 * @returns Axios promise
 */
module.exports = (url) => Axios.get(url).then(ret => ret.data);
