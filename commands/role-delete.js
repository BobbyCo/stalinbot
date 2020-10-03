const c = require('../config.json');

module.exports = {
    name: "delete-role-use",
    desc: "supprime la fonction d'un role",

    adminOnly: true,
    roles: [c.adminRole, c.userRole]
}

module.exports.execute = async (msg, args, R) => {
    if(!Array.from(msg.mentions.roles).length)
        return msg.channel.send(`\`${args[0]}\` n'est pas un role !`);
    args.shift();

    const role = msg.mentions.roles.first().name;

    const roleData = {
        name: role
    }

    const res = R.db.delete('roles', roleData);
    if(res && res.error)
        msg.channel.send('Le role `' + role + '` sert déjà à rien');
    else
        msg.channel.send('Le role `' + role + '` est dorénavent inutile');

}