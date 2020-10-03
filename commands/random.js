const request = require('request');
const cheerio = require('cheerio');
const { get } = require('request');

module.exports = {
    name: "random",
    desc: "cherche une image au pif",

    args: -1,
    usage: '<query>'
}

module.exports.execute = async (msg, args, R) => {
    const options = {
        url: "http://results.dogpile.com/serp?qc=images&q=" + args.join('+'),
        method: "GET",
        headers: {
            "Accept": "text/html",
            "User-Agent": "Chrome"
        }
    }

    request(options, (error, response, html) => {
        if(!error && response.statusCode == 200) {
            const $ = cheerio.load(html);
            const images = $('.image a.link');

            // Randomising
            const index = Math.floor(Math.random() * images.length);
            msg.channel.send( images.eq(index).attr('href') );
        }
    });
}