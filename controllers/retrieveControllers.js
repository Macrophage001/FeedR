const axios = require('axios');

const formatSimpleText = (text) => 
    text
        .replaceAll('Sponsored Content', '')
        .replaceAll('\r', ' ')
        .replaceAll('\n', ' ')
        .replaceAll('\t', ' ')
        .replaceAll('\b', ' ')
        .split(' ')
        .filter(word => word !== '');

const getValidMapping = (url) => urlScraperMap.filter(mapping => url.includes(mapping.url))[0];

const retrieveSite = async (req, resp) => {
    console.log('RETRIEVE SITE REQUEST RECEIVED');

    let url = req.query.url;
    let response = await axios.get(url);
    let mapping = getValidMapping(url);
    let wordArr = mapping.decoder(response);

    let instructions = mapping.instructions;

    resp
        .status(200)
        .send({ wordArr, instructions });
}
const retrieveFile = async (req, resp) => {
    console.log('RETRIEVE FILE REQUEST RECEIVED');
    if (!req.files) {
        resp.status(404).send('No file uploaded');
    } else {
        let fileText = req.files.file.data.toString();
        resp.status(200).send({ wordArr: formatSimpleText(fileText) });
    }
}
const retrieveText = async (req, resp) => {
    console.log('RETRIEVE TEXT REQUEST RECEIVED');
    console.log('WORD ARRAY: ', req.body.text);

    let wordArr = formatSimpleText(req.body.text);
    resp.status(200).send({ wordArr });
}

module.exports = { retrieveSite, retrieveFile, retrieveText }