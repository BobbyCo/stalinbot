const c = require('../config.json');

module.exports = {
    name: "edit-role-use",
    desc: "modifie la fonction d'un role",

    adminOnly: true,
    roles: [c.adminRole, c.userRole]
}

module.exports.execute = async (msg, args, R) => {
    if(!Array.from(msg.mentions.roles).length)
        return msg.channel.send(`\`${args[0]}\` n'est pas un role !`);
    args.shift();

    const role = msg.mentions.roles.first().name;
    const desc = args.join(' ');

    const res = R.db.update('roles', {name: role}, {desc: desc});
    if(res && res.error)
        msg.channel.send('Une erreur s\'est produite');
    else
        msg.channel.send('La fonction de `' + role + '` à été mise à jour');
}