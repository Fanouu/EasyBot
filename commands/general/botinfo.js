const Discord = require("discord.js");
const ms = require("ms")
const errors = require("../../utils/errors");
const cfg = require("../../config.json");
const { stripIndents } = require("common-tags");

module.exports.run = async (client, message, args, prefixes, lang) => { 
    
    message.channel.startTyping()

    const embed = new Discord.MessageEmbed()
    .setTitle("Information du bot et son developpeur")
    .addField(":desktop: - Version ", "v. "+ cfg.bot.version)
    .addField(":dividers: - Librairy", "Node.js and Discord.js")
    .setColor("RANDOM")
    .setFooter("Made on 💻 with ❤️ by Fan")

    message.channel.send(embed)
    message.channel.stopTyping()
}

module.exports.help = {
    name: `botinfo`,
    aliases: ['bi', 'infobot', 'about'],
    category: "general",
    descriptionfr: "Info du bot et son developpeur",
    descriptionen: "Ask an question to the bot",
    usage: "`.help`",
    botPermissions: [],
    userPermissions: [ "ADMINISTRATOR" ],
    blacklists: true,
    staffOnly: false, 
    ownerOnly: false,
    disabled: false
}