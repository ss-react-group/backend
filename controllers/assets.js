const fs = require('fs');

/**
 * Models
 */
const {
  Asset,
  AssetType,
} = require('../models/assets');

/**
 * Helpers
 */
const {
  checkIfPathExist,
  moveFiles,
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
        res.status(500).send(err);
      }
    }

    // Path for saving files
    const path = `tmp/${files.file.name}`;

    // Move file into tmp folder
    files.file.mv(path, (err) => {
      if (err) {
        res.status(500).send(err);
      } else {
        const fileNewPath = moveFiles(path, `assets/${new Date().getTime()}/`);
        fileNewPath
          .then((newPath) => {
            const createNewAsset = Asset.findOrCreate({
              where: {
                user_id: userId,
                type_id: typeId,
              },
              defaults: {
                filePath: newPath,
                user_id: userId,
                type_id: typeId,
              },
            });


            createNewAsset
              .spread((result, created) => {
                if (created) {
                  res.status(200).send(result);
                } else {
                  const updateAssetsPromise = Asset.update({
                    filePath: newPath,
                  }, {
                    where: {
                      user_id: userId,
                      type_id: typeId,
                    },
                    returning: true,
                    plain: true,
                  });

                  updateAssetsPromise
                    .then(() => Asset.findOne({
                      where: {
                        user_id: userId,
                        type_id: typeId,
                      },
                      include: [{
                        model: AssetType,
                      }],
                    }))
                    .then((updated) => {
                      res.status(200).send(updated);
                    })
                    .catch(updateAssetsPromiseError => res.send(updateAssetsPromiseError));
                }
              });
          })
          .catch(err => res.status(500).send(err));
      }
    });
  } else {
    res.status(500).send('Cannot find any files');
  }
}

/**
 * Add new asset type (ONLY BY POSTMAN)
 * @param {} req HTTP request
 * @param {} res HTTP response
 */
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
        })
        .catch(err => res.status(200).send(err));
    } else {
      res.status(500).send('No type in body');
    }
  } else {
    res.status(500).send('No Body');
  }
}

/**
 * Get all assets
 */
function getAsset(req, res) {
  const {
    params,
  } = req;

  const {
    userId,
    typeId,
  } = params;

  if (userId && typeId) {
    const assetPromise = Asset.findOne({
      where: {
        user_id: userId,
        type_id: typeId,
      },
    });

    assetPromise
      .then(foundedAsset => res.status(200).send(foundedAsset))
      .catch(err => res.status(500).send(err));
  }
}
/**
 * Get assets types
 * @param {*} req
 * @param {*} res
 */
function getAssetType(req, res) {
  const {
    body,
  } = req;

  if (body) {
    const findAllAssetsTypes = AssetType.findAll();

    findAllAssetsTypes
      .then((assetsTypes) => {
        if (assetsTypes.length > 0) {
          res.status(200).send(assetsTypes);
        } else {
          res.status(200).send([]);
        }
      })
      .catch(err => res.status(500).send(err));
  }
}

module.exports = {
  fileUpload,
  addNewAssetType,
  getAssetType,
  getAsset,
};
