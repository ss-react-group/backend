const fs = require('fs');


/**
 * checkIfPathExist
 * @param {string} path Givent path, return true / false
 * @returns {boolean} True / false
 */
function checkIfPathExist(path) {
  return fs.existsSync(path);
}


/**
 *
 * @param {string} oldPath Old path of file
 * @param {string} newPath New path for file
 */
function moveFiles(oldPath, newPath) {
  // Get file name from 'tmp/**' path
  const fileName = oldPath.split('/')[1];
  // Check if new path exist
  const pathExist = checkIfPathExist(newPath);

  /**
   * File rename (move)
   * @param {function} reject Reject function
   * @param {function} resolve Resolve function
   */
  return new Promise((resolve, reject) => {
    if (!pathExist) {
      fs.mkdir(newPath, () => {
        fs.rename(oldPath, newPath + fileName, (err) => {
          if (err) reject(err);
          resolve(newPath + fileName);
        });
      });
    } else {
      fs.rename(oldPath, newPath + fileName, (err) => {
        if (err) reject(err);
        resolve(newPath + fileName);
      });
    }
  });
}


module.exports = {
  moveFiles,
  checkIfPathExist,
};
