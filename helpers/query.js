/**
 *
 * @param {Array} results Array of results
 */
function queryResultHandler(results, response) {
  if (results && results.length > 0) {
    response.status(200).send(results);
  } else if (results && results.length === 0) {
    response.status(404).send(results);
  } else {
    response.status(500).send('Connection error');
  }
}


function catchErrorHandler(err, response) {
  console.log(err);
  if (err) {
    response.status(500).send(err);
  }
}

module.exports = {
  queryResultHandler,
  catchErrorHandler,
};
