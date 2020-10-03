const c = require('../config.json');

module.exports = {
    name: "add-role-use",
    desc: "ajoute une fonction à un role",

    args: -2,
    usage: "<role> <description>",

    adminOnly: true,
    roles: [c.adminRole, c.userRole]
}

module.exports.execute = async (msg, args, R) => {
    if(!Array.from(msg.mentions.roles).length)
        return msg.channel.send(`\`${args[0]}\` n'est pas un role !`);
    args.shift();

    const role = msg.mentions.roles.first().name;
    const desc = args.join(' ');

    const roleData = {
        name: role,
        desc: desc,
        isAdmin: false
    }

    const res = R.db.insert('roles', roleData);
    if(res && res.error)
        msg.channel.send('Une erreur s\'est produite');
    else
        msg.channel.send('Le role `' + role + '` sert maintenant à quelquechose');
}