const c = require('../config.json');

module.exports = {
    name: "add-cmd",
    desc: "ajoute une commande",

    args: -3,
    usage: '<nom> <extension> <contenu>',

    adminOnly: true,
    roles: [c.adminRole, c.commandRole]
}

module.exports.execute = async (msg, args, R) => {
    const name = args.shift();
    let   type = args.shift();
    const content = args.join(' ');

    if(!type.match(/[text|jp(e?)g|png|gif]/g))
        type = 'text';

    await R.db.insert('commands', {name: name, type: type, content: content});
    msg.channel.send('la commande `' + name + '` a été ajoutée');
}