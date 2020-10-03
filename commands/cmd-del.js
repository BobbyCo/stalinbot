const c = require('../config.json');

module.exports = {
    name: "del-cmd",
    desc: "supprime une commande",

    args: 1,
    usage: '<nom>',

    adminOnly: true,
    roles: [c.adminRole, c.commandRole]
}

module.exports.execute = async (msg, args, R) => {
    const name = args.shift();

    await R.db.delete('commands', {name: name});
    msg.channel.send('la commande `' + name + '` a été supprimée');
}