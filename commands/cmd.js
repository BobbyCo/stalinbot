const fs = require('fs');
const {MessageAttachment} = require('discord.js');

module.exports = {
    name: "cmd",
    desc: "execute une commande",
    beta: true
}

module.exports.execute = async (msg, command, R) => {
    const cmd = await R.db.fetch('commands', {name: command.name});
    if(cmd == null) return false;

    cmd.increment('num_usage');
    
    const type = cmd.get('type');
    const content = cmd.get('content');

    if(type == 'text')
        msg.channel.send(content);
    else {
        const attachement = new MessageAttachment(content, `image.${type}`);
        msg.channel.send(attachement);
    }

    
    return true;
}