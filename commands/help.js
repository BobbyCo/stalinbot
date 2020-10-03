const {MessageEmbed} = require('discord.js');
const {prefix} = require('../config.json');

module.exports = {
    name: "help",
    beta: true
}

module.exports.execute = async (msg, args, R) => {
    const embed = new MessageEmbed()
    .setColor('#000')
    .setAuthor(msg.client.user.username, msg.client.user.avatarURL());

    const commands = msg.client.commands.filter(c => (!c.beta && !c.adminOnly));
    const names = commands.map(c => c.name);
    const descs = commands.map(c => c.desc);
    
    embed.setDescription(R.string.helpText.format(prefix));
    embed.addField(R.string.helpTitle.format(), "\n```md\n" + formatCmd(names, descs) + "\n```");

    msg.channel.send(embed);
}

const formatCmd = (names, descs) => {
    let text = "";
    const length = names.slice(0).sort((a,b) => (b.length - a.length))[0].length;

    names.forEach((n, i) => {
        text += `- ${n}  ${genSpaces(length-n.length)}  ${descs[i]}\n`;
    })

    return text;
}

const genSpaces = (n) => {
    let spaces = "";
    for(let i = 0; i < n; i++) {
        spaces += " ";
    }
    return spaces;
}

