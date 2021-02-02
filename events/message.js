const Discord = require("discord.js");
const cfg = require("../config.json");
const errors = require("../utils/errors.js");

const fs = require("fs");

module.exports = async (client, message) => {

    if(message.author.bot) return;


    let prefixes = cfg.bot.defaultPrefix
    let lang = cfg.bot.defaultLang


    let langFile = require(`../lang/${lang}`);

    let dev = client.users.fetch('709481084286533773');
 
    if(message.mentions.users.get(client.user.id)) {

        if(lang == 'fr') {
            return message.channel.send(`${cfg.emojis.information} ${message.author}, Bonjour vous pouvez faire **${prefixes}help** pour avoir la liste des commandes !`);
        } else if(lang == 'en') {
            return message.channel.send(`${cfg.emojis.information} ${message.author}, Hi you can do **${prefixes}help** to get the command list !`);
        }
    }

    if(!message.content.startsWith(prefixes)) return;

    const args = message.content.slice(prefixes.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    const mid = message.mentions.users.first()

    let commandfile;

    if(client.commands.has(cmd)) {
        commandfile = client.commands.get(cmd);
    } else if (client.aliases.has(cmd)){
        commandfile = client.commands.get(client.aliases.get(cmd));
    } else {
        return;
    }

    if(!message.guild.me.hasPermission("EMBED_LINKS")) {
        return errors.nopermsend(message, lang);
    }

    if(commandfile.help.enabled == false) return message.reply(`${cfg.emojis.warning}  | **Cette commande est actuellement désactivé !**`)

    if(commandfile.help.botPermissions) {
        let neededPermissions = [];

        commandfile.help.botPermissions.forEach((perm) => {
        if (!message.channel.permissionsFor(message.guild.me).has(perm)) {
            neededPermissions.push(perm);
        }
        })
        if (neededPermissions.length !== 0) {
        if (neededPermissions.length > 1) {
            return errors.botMultiPerms(message, neededPermissions.map((p) => `\`${p}\``).join(", "), lang)
        } else {
            return message.channel.send(`**Je n'est pas les permission requise:** \`${neededPermissions}\``)
        }
    }
}

    if (commandfile.help.userPermissions) {

        let neededPermissions = [];

        commandfile.help.userPermissions.forEach((perm) => {
            if (!message.member.hasPermission(perm)) {
                neededPermissions.push(perm);
            }
        })
        if (neededPermissions.length !== 0) {
            if (neededPermissions.length > 1) {
                return errors.noMultiPerms(message, neededPermissions.map((p) => `\`${p}\``).join(", "), lang)
            } else {
                return errors.noPerms(message, "`" + neededPermissions + "`", lang)
            }
        }
    }  


            
    if(commandfile.help.staffOnly == true) {
        if(!cfg.staff.moderators.id.includes(message.author.id)) return errors.noStaff(message, lang)
      }
  
      if(commandfile.help.ownerOnly == true) {
          if(!cfg.staff.owners.id.includes(message.author.id)) return errors.noOwner(message, lang)
      }  
       
    if(commandfile.help.blacklists == true) { 
        const pr = message.author
        const pr2 = message.author.id
        
        if(cfg.staff.blacklist.iduser.includes(message.author.id)) return message.reply("Cheh tu est blacklist")
    }

    try{

    const commandE = new Discord.MessageEmbed()
    .setTitle(`${cfg.emojis.command} Command execution`)
    .setColor(cfg.color.purple)
    .addField(`<:label:750780936320450631> Name`, commandfile.help.name)
    .addField(`<:roleList:750781042041946122> Author`, message.author.tag)
    .addField(`<:cityhall:756245380437508116> Guild`, message.guild.name)

    commandfile.run(client, message, args, prefixes, lang); 

    console.log("CMD: " + message.content)

    } catch (err) {

        const command = commandfile.help.name;

        errors.cmdError(client, message, err, command)
        
       let fan = client.users.cache.get("524615583447384064");
       fan.send("**__Erreur:__** " + err);


   }
    
};