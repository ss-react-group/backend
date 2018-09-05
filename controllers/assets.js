const fs = require('fs');
const {
  Asset,
} = require('../models/assets');


const {
  checkIfPathExist,
} = require('../helpers/filesystem');

/**
 * Upload file, save in tmp folder
 * @param {} req Http request
 * @param {} res Http respons
 */
function fileUpload(req, res) {
  // Check if file exsist

  if (req.files) {
    const {
      files,
    } = req;


    // Check if tmp folder exist
    if (!checkIfPathExist('tmp/')) {
      try {
        fs.mkdirSync('tmp/');
      } catch (err) {
        res.send(err);
      }
    }

    // Path for saving files
    const path = `tmp/${files.file.name}`;

    // Move file into tmp folder
    files.file.mv(path, (err) => {
      if (err) {
        res.status(500).send('Error');
      }
      res.status(200).send({
        path,
      });
    });
  } else {
    res.status(500).send('Cannot find any files');
  }
}

module.exports = {
  fileUpload,
};
