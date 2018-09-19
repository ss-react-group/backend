const {
  Asset,
  AssetType,
} = require('../models/assets');

function setDefaultImages(spreadedResponse, req, res, token) {
  const getAllAssetTypes = AssetType.findAll();

  getAllAssetTypes
    .then((assetTypes) => {
      const assetTypeLength = assetTypes.length;
      const asstesPromises = [];
      for (let i = 0; i < assetTypeLength; i += 1) {
        const assetType = assetTypes[i];

        const createDefaultUserAssets = Asset.findOrCreate({
          where: {
            user_id: spreadedResponse.id,
            type_id: assetType.id,
          },
          defaults: {
            filePath: `assets/static/${assetType.type}.jpg`,
            user_id: spreadedResponse.id,
            type_id: assetType.id,
          },
        });

        asstesPromises.push(createDefaultUserAssets);
      }

      Promise.all(asstesPromises).then(() => {
        res.status(200).send({
          spreadedResponse,
          token,
        });
      });
    });
}


module.exports = {
  setDefaultImages,
};
