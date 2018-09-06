const fs = require('fs');
const {
  Asset,
  AssetType,
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

  const {
    params,
  } = req;


  if (req.files && params.typeId && params.userId) {
    const {
      files,
    } = req;


    const {
      typeId,
      userId,
    } = params;


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

      const createNewAsset = Asset.create({
        filePath: path,
        user_id: userId,
        type_id: typeId,
      });

      createNewAsset
        .then(createdAsset => res.status(200).send(createdAsset));
    });
  } else {
    res.status(500).send('Cannot find any files');
  }
}


function addNewAssetType(req, res) {
  const {
    body,
  } = req;


  if (body) {
    const {
      type,
    } = body;

    if (type && type !== '') {
      const findOrCreate = AssetType.findOrCreate({
        where: {
          type,
        },
        defaults: {
          type,
        },
      });

      findOrCreate
        .spread(assetType => assetType)
        .then((spreadedResponse) => {
          res.status(200).send({
            spreadedResponse,
          });
        });
    } else {
      res.status(500).send('No type in body');
    }
  } else {
    res.status(500).send('No Body');
  }
}

module.exports = {
  fileUpload,
  addNewAssetType,
};
