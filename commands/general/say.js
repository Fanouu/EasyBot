const Discord = require("discord.js");
const cfg = require("../../config.json");



module.exports.run = async (client, message, args, prefixes,lang) => {
    
    const langFile = require(`../../lang/${lang}`); 
    
    const sayMessage = args.join(" ");
    
    if(!sayMessage) return message.channel.send(`${cfg.emojis.error} Vous devez Indiquer un message`)

    if(sayMessage)
    message.delete().catch(O_o=>{}); 
    // And we get the bot to say the thing: 
    message.channel.send(sayMessage);
}

module.exports.help = {
    name: "say",
    aliases: [],
    category: "general",
    descriptionfr: "Envoyer un message Via le bot",
    descriptionen: "",
    usage: "``.say <message>``",
    ownerOnly: false,
    staffOnly: false,
    blacklists: true,
    botPermissions: [],
    userPermissions: ["MANAGE_MESSAGES"],
    enabled: true,
    }