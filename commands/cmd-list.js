const {MessageEmbed} = require('discord.js');
const {commandRole} = require('../config.json');

module.exports = {
    name: "list-cmd",
    desc: "liste toutes les commandes custom"
}

module.exports.execute = async (msg, args, R) => {
    const embed = new MessageEmbed()
    .setColor('#000')
    .setAuthor(msg.client.user.username, msg.client.user.avatarURL())
    .setTitle('Commandes custom');

    const commands = await R.db.fetchAll('commands', {});
    const sorted = commands.sort((a,b) => (a.get('num_usage') > b.get('num_usage')));

    const text = "```md\n" + sorted.map((c,i) => `${i+1}. ${c.get('name')} - ${c.get('num_usage')} utilisations`).join('\n') + "```";

    embed.setDescription(`Les voici, triées par nombre d'utilisations. Pour en ajouter, contactez les \`${commandRole}\`\n${text}`);
    msg.channel.send(embed);
}