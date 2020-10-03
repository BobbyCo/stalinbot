const {MessageEmbed} = require('discord.js');
const conf = require('../config.json');

module.exports = {
    name: "admin-help",
    beta: true,

    adminOnly: true,
    roles: [conf.adminRole, conf.commandRole, conf.userRole]
}

module.exports.execute = async (msg, args, R) => {
    const embed = new MessageEmbed()
    .setColor('#000')
    .setAuthor(msg.client.user.username, msg.client.user.avatarURL());

    const adminCommands = msg.client.commands.filter(c => (!c.beta && c.adminOnly))
    
    
    // Filtering admin commands
    const userRole = getUserHighestRole(msg.member);
    const commands = adminCommands.filter(c => c.roles.includes(userRole));

    const names = commands.map(c => c.name);
    const descs = commands.map(c => c.desc);
    
    embed.setDescription(R.string.helpAdminText.format(userRole, conf.prefix));
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

const getUserHighestRole = (member) => {
    for(r of module.exports.roles) {
        if(member.roles.cache.some(role => role.name == r)) return r;
    };
    return module.exports.roles[0];
}