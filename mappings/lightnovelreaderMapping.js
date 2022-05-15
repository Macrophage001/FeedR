const cheerio = require('cheerio');

const mapping = {
    url: 'https://lightnovelreader.org/',
    decoder: (res) => {
        const $ = cheerio.load(res.data);
        let wordArr = [];
        $('#chapterText p').get().forEach(element => {
            $(element)
                .text()
                .split(' ')
                .filter(word => word !== ' ')
                .forEach(word => wordArr.push(word));
        });
        return wordArr;
    }
}

module.exports = mapping;