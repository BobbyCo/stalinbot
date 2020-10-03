const {MessageEmbed} = require('discord.js');

module.exports = {
    name: "role",
    desc: "elle dit à quoi tu sers",

    usage: '<personne>'
}

module.exports.execute = async (msg, args, R) => {
    let member = (args.length) ? getMember(msg) : msg.member;

    const userRoles = member.roles.cache.map(r => r.name).slice(0,-1);
    const embed = new MessageEmbed()
    .setColor("#000")
    .setAuthor(getAuthor(member), member.user.avatarURL())
    .setDescription('Ce vaillant membre de CommuMao remplit les fonctions suivantes');

    for(i in userRoles) {
        embed.addField(userRoles[i], await getDesc(userRoles[i], R));
    }
    msg.channel.send(embed);
}

const getMember = (msg) => {
    return msg.guild.members.cache.get(msg.mentions.users.first().id);
}

const getDesc = async (role, R) => {
    const entry = await R.db.fetch('roles', {name: role});
    return (entry) ? entry.get('desc') : 'Ce role ne sert à rien !';
}

const getAuthor = (m) => {
    return (!m.nickname) ? m.user.username : m.nickname;
}