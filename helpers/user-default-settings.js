const {
  Asset,
  AssetType,
} = require('../models/assets');

function setDefaultImages(userId) {
  const getAllAssetTypes = AssetType.findAll();

  getAllAssetTypes
    .then((assetTypes) => {
      const assetTypeLength = assetTypes.length;

      for (let i = 0; i < assetTypeLength; i += 1) {
        const assetType = assetTypes[i];

        const createDefaultUserAssets = Asset.create({
          filePath: `/assets/static/${assetType.type}.jpg`,
          user_id: userId,
          type_id: assetType.id,
        });

        createDefaultUserAssets
          .then(res => console.log('created default assets ', res));
      }
    });
}


module.exports = {
  setDefaultImages,
};
