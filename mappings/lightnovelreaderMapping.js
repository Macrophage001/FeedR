const cheerio = require('cheerio');

const mapping = {
    url: 'https://lightnovelreader.org/',
    decoder: (res) => {
        const $ = cheerio.load(res.data);
        let wordArr = [];
        $('#chapterText p').get().forEach(element => {
            // $(element)
            //     .text()
            //     .split(' ')
            //     .filter(word => word !== ' ')
            //     .forEach(word => wordArr.push(word));
            wordArr = $(element)
                .text()
                .replaceAll('Sponsored Content', '')
                .replaceAll('\r', ' ')
                .replaceAll('\n', ' ')
                .replaceAll('\t', ' ')
                .replaceAll('\b', ' ')
                .split(' ')
                .filter(word => word !== '')
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

module.exports = mapping;