const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const { retrieveFile, retrieveSite, retrieveText } = require('../controllers/retrieveControllers');

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
            const { getModules } = require(path.join(__dirname, '../', process.env.MAPPING_MODULE_DIRECTORY, file));
            getModules().forEach(mapping => {
                if (mapping !== undefined && mappingValidityCheck(mapping.url, mapping.decoder)) {
                    urlScraperMap.push( mapping );
                } else {
                    console.error('Invalid Mapping: Must include valid URL: string and decoder: [Function (string) => string[]]', mapping);
                }
            })
        })
    })
})();

router.route('/')
    .get(retrieveSite);
router.route('/file')
    .post(retrieveFile);
router.route('/text')
    .post(retrieveText);

module.exports = router;