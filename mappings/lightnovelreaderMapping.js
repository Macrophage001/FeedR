const cheerio = require('cheerio');

const lightNovelReaderMapping = {
    url: 'https://lightnovelreader.org/',
    decoder: (res) => {
        const $ = cheerio.load(res.data);
        let wordArr = [];
        $('#chapterText p').get().forEach(element => {
            $(element)
                .text()
                .replace('Sponsored Content', '')
                .split(' ')
                .filter(word => word !== '')
                .forEach(word => wordArr.push(word));
        });
        return wordArr;
    },
    instructions: [
        '<h1>Instructions for https://lightnovelreader.org/</h1>',
        '<ol>',
        '<li>Find a novel</li>',
        '<li>Select the chapter that you want to read and copy its address.</li>',
        '<li>Paste the address into FeedR</li>',
        '</ol>'
    ]
}

const getModules = () => [lightNovelReaderMapping];

module.exports = { getModules }