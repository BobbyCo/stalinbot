const path = require('path');

module.exports = {
    name: "music",
    desc: "Transmet les préceptes de l'évangile"
}

module.exports.execute = async (msg, args, R) => {
    const FILE = path.join(__dirname, "../", "res/music/russie.mp3");
    console.log(FILE);

    if(!msg.member.voice.channel)
        return msg.channel.send('Faut que tu sois connecté à un salon vocal nunuche !');

    const connection = await msg.member.voice.channel.join();
    const dispatcher = connection.play(FILE, {volume: 0.5});

    dispatcher.on('finish', () => {
        setTimeout(() => {
            connection.disconnect();
        }, 5000);
    });
}