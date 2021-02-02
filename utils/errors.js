const Discord = require("discord.js");
const cfg = require("../config.json");

module.exports.noArgs = async (message, lang, arg) => {

    message.delete();
 
    if(lang == 'fr'){
    message.channel.send(`**${cfg.emojis.error} Vous devez faire: ${arg}**`).then(m => m.delete({
        timeout: 3000
    }));
    }
    if(lang == 'en'){
      message.channel.send(`**${cfg.emojis.error} You must do: ${arg}**`).then(m => m.delete({
        timeout: 3000
    }));

   }

}

module.exports.noPerms = async (message, perm, lang) => {

    message.delete();

     if(lang == 'fr'){
       noPermMSG = `**${cfg.emojis.error} Vous n'avez pas la permission: ${perm}**`;
     } else if(lang == 'en'){
       noPermMSG = `**${cfg.emojis.error} You doesn't have permission: ${perm}**`;
     }

    message.channel.send(noPermMSG).then(m => m.delete({
        timeout: 3000
    }));
}

module.exports.noMultiPerms = async (message, perm, lang) => {

    message.delete();

    message.channel.send(`**${cfg.emojis.error} Vous n'avez pas les permission: ${perm}**`).then(m => m.delete({
        timeout: 3000
    }));
}

module.exports.disabled = async (message) => {

    message.delete();

    message.channel.send(`**${cfg.emojis.error} Cette commande est actuellement désactivée !**`).then(m => m.delete({
        timeout: 3000
    }));
}

module.exports.cmdError = async (client, message, err, file) => {

    let devDM = await client.users.cache.get('709481084286533773');

    message.channel.send(`${cfg.emojis.error} **__Cette commande contient une erreur__**\n Un rapport va être envoyé au développeur du bot... \n \n **Merci de ne pas ré-utiliser cette commande tant que l'erreur est présente !**`)

    let embed = new Discord.MessageEmbed()
            .setTitle(`:bug: **La commande: __${file}__ contient un bug**`)
            .setDescription(`**__Erreur:__** \n ${err}`)
            .setAuthor(message.author.username, message.author.displayAvatarURL({format: 'png', dynamic: true, size: 1024}))
            .setColor(cfg.color.red)
            .setFooter(`Bot développé par: ${cfg.staff.owners.name}`);
    devDM.send(embed)

}

module.exports.cooldown = async (message, timeLeft) => {

    message.delete();

    message.channel.send(`**${cfg.emojis.cooldown} Vous devez attendre encore ${timeLeft.toFixed(0)}s avant de pouvoir refaire la commande !**`).then(m => m.delete({
        timeout: 1000
    }));
}

module.exports.memberNotFound = async (message, member) => {

    message.delete();

    message.channel.send(`**${cfg.emojis.error} Le membre \`\`${member}\`\` n'a pas été trouvé !**`).then(m => m.delete({
        timeout: 1000
    }));
}