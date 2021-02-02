const Discord = require("discord.js");
const cfg = require("../../config.json");
const fs = require("fs");
const Resolvers = require("../../helpers/resolvers");

module.exports.run = async (client, message, args, prefixes, lang, data) => {

    let say = args.join(" ");

    if(lang == 'fr'){
        titre = "**Quel titre voulez vous pour l'embed?** \nEcrivé sous ce message &  ``cancel`` pour arréter"
    } else if(lang == 'en'){
        titre = "**What title do you want embed?** \n Write under this message & ``cancel`` for exit"
    }
     
    message.channel.send(titre)

    const filter = (m) => m.author.id === message.author.id;
    const opt = { max: 1, time: 120000, errors: [ "time" ] };

    /* Mettre un collecteur et rÃ©cupÃ©rer son rÃ©sultat en variable (avec les filtres 
    dÃ©finis au dessus)*/
    const collected = await message.channel.awaitMessages(filter, opt).catch(() => {});

    // Si aucun message n'a Ã©tÃ© envoyÃ©
    if(!collected || !collected.first()) return message.channel.send("Vous avez pris trop de temp !")

    /* RÃ©cupÃ©rer le message (contenue du premier collectÃ©) */
    const msg = collected.first().content;

    if(msg === "cancel") return message.channel.send("**exit succesfully** !")
    
    /* Et aprÃ¨s on peut s'en servir */

    if(lang == 'fr'){
        content = "**Quel description voulez vous pour l'embed** \n Ecrivé sous ce message &  ``cancel`` pour arréter "
    }else if(lang == 'en'){
        content = "**What description do you want for embed** \n Write under this message & ``cancel`` for exit"
    }
    
    message.channel.send(content)
    
    const collected2 = await message.channel.awaitMessages(filter, opt).catch(() => {});

    if(!collected2 || !collected2.first()) return message.channel.send("Vous avez pris trop de temp !")

    const msg2 = collected2.first().content;

    if(msg2 === "cancel") return message.channel.send("**exit succesfully** !")

    if(lang == 'fr'){
        channl = "**Dans quel salon voulez vous envoyé l'embed** \n Ecrivé sous ce message &  ``cancel`` pour arréter "
    }else if(lang == 'en'){
        channl = "**In which channel do you want to send embed ** \n Write under this message & ``cancel`` for exit"
    }

    message.channel.send(channl)

    const collected3 = await message.channel.awaitMessages(filter, opt).catch(() => {});
    
    if(!collected3 || !collected3.first()) return message.channel.send("Vous avez pris trop de temp !")

    let msg3 = collected3.first().content;
    
    if(msg3 === "cancel") return message.channel.send("**exit succesfully** !")

    const sentChannel = await Resolvers.resolveChannel({
        message,
        search: msg3,
        channelType: "text"
    });

    if(lang == 'fr'){
        succes = `${cfg.emojis.succes} **L'embed a bien été envoyé dans** <#${sentChannel.id}>`
    }else if(lang == 'en'){
        succes = `${cfg.emojis.succes} **The embed has been sent to ** <#${sentChannel.id}>`
    }   

    message.channel.send(succes)

    const embedbuild = new Discord.MessageEmbed()
    .setDescription(msg2)
    .setTitle(msg)
    .setFooter(message.author.tag)
    .setColor("RANDOM")
    
    client.channels.cache.get(sentChannel.id).send(embedbuild)

}

module.exports.help = {
    name: "create-embed",
    aliases: ["build-embed"],
    category: "general",
    descriptionfr: "Créer un embed",
    descriptionen: "Create a embed",
    usage: "``.create-embed``",
    ownerOnly: false,
    staffOnly: false,
    blacklists: true,
    botPermissions: [],
    userPermissions: [ "ADMINISTRATOR" ],
    enabled: true,
    }