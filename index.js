require('dotenv').config();

const { default: axios } = require('axios');
const express = require('express');
const app = express();
const port = process.env.port || 5000
const fs = require('fs');
const path = require('path');

const mappingValidityCheck = (url, decoder) => {
    let isValidURL = typeof url === 'string';
    let isValidDecoder = typeof decoder === 'function';
    return isValidURL && isValidDecoder;
}

let urlScraperMap = [];
;(() => {
    fs.readdir(process.env.MAPPING_MODULE_DIRECTORY, (err, files) => {
        if (err) console.error(err);
        files.forEach(file => {
            let mapping = require(path.join(__dirname, process.env.MAPPING_MODULE_DIRECTORY, file));
            if (mapping !== undefined && mappingValidityCheck(mapping.url, mapping.decoder)) {
                // console.log('Mapping Found!: ', mapping);
                urlScraperMap.push( mapping );
            }
            else {
                console.error('Invalid Mapping: Must include valid URL: string and decoder: [Function (string) => string[]]', mapping);
            }
        })
    })
})();


const getValidMapping = (url) => urlScraperMap.filter(mapping => url.includes(mapping.url))[0];
const getValidDecoder = (url) => urlScraperMap.filter(mapping => url.includes(mapping.url))[0].decoder;

app.get('/retrieve', async (req, resp) => {
    let url = req.query.url;
    let response = await axios.get(url);
    let mapping = getValidMapping(url);

    console.log(mapping);

    let wordArr = mapping.decoder(response);
    let instructions = mapping.instructions;

    resp.send({ wordArr, instructions });
});

app.post('/retrieveFile', (req, resp) => {
    console.log(req);
});


app.listen(port, () => console.log('Listening on port: ' + port));