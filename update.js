const fs = require('fs');

const path = __dirname + '/metadata';
const buildDescription = (oldValue, id) => 'description...';
const buildName = (oldValue, id) => 'Name #' + id;
const buildImageUri = (oldValue, id) => 'ipfs://_CID_/' + id + '.png';
const buildExternalUrl = (oldValue, id) => 'https://thirdweb.com';

const getTokenId = (filePath) => {
  return filePath.match(/([0-9]+)\.json/)[1];
}

fs.readdirSync(path).forEach((fileName) => {
  const filePath = path + '/' + fileName;
  const stat = fs.statSync(filePath);

  if (!stat.isFile()) {
    return;
  }

  if (fileName.endsWith('.json')) {
    const jsonContent = require(filePath);
    const tokenId = getTokenId(fileName);

    jsonContent.name = buildName(jsonContent.name, tokenId);
    jsonContent.description = buildDescription(jsonContent.description, tokenId);
    jsonContent.image = buildImageUri(jsonContent.image, tokenId);
    jsonContent.external_url = buildExternalUrl(jsonContent.external_url, tokenId);

    fs.writeFileSync(filePath, JSON.stringify(jsonContent, null, 2));
  }
});
