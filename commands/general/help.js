const Discord = require("discord.js");
const ms = require("ms")
const errors = require("../../utils/errors");
const cfg = require("../../config.json");
const { stripIndents } = require("common-tags");

module.exports.run = async (client, message, args, prefixes, lang) => { 
    
        if (args[0]) {
            return getCMD(client, message, args[0]);
        } else {
            // Otherwise send all the commands available
            // Without the cmd info
            return getAll(client, message);
        }

function getAll(client, message) {
    const embed = new Discord.MessageEmbed()
        .setColor("#FFDFD3")
        .setTitle('Page d\'aide! ')
        .setFooter("Made on 💻 with ❤️ by Fan")
        
    // Map all the commands
    // with the specific category
    const commands = (category) => {
        return client.commands
            .filter(cmd => cmd.help.category === category)
            .map(cmd => `\`${cmd.help.name}\``)
            .join(", ");
    }

    // Map all the categories
    const info = client.categories
        .map(cat => stripIndents`**${cat[0].toUpperCase() + cat.slice(1)}** \n${commands(cat)}`)
        .reduce((string, category) => string + "\n ------ \n" + category);        

    return message.channel.send(embed.setDescription(info));
    
}

function getCMD(client, message, input) {
    const embed = new Discord.MessageEmbed()

    // Get the cmd by the name or alias
    const cmd = client.commands.get(input.toLowerCase()) || client.commands.get(client.help.aliases.get(input.toLowerCase()));
    
    let info = `No information found for command **${input.toLowerCase()}**`;

    // If no cmd is found, send not found embed
    if (!cmd) {
        return message.channel.send(embed.setColor("RED").setDescription(info));
    }

    // Add all cmd info to the embed
    if (cmd.help.name) info = `**Command name**: ${cmd.help.name}`;
    if (cmd.help.aliases) info += `\n**Aliases**: ${cmd.help.aliases.map(a => `\`${a}\``).join(", ")}`;
    if (cmd.help.description) info += `\n**Description**: ${cmd.help.description}`;
    if (cmd.help.usage) {
        info += `\n**Usage**: ${cmd.help.usage}`;
        embed.setFooter(`Syntax: <> = required, [] = optional`);
    }

    return message.channel.send(embed.setColor("GREEN").setDescription(info));
   }
}

module.exports.help = {
    name: `help`,
    aliases: ['h', 'a', 'aide'],
    category: "general",
    descriptionfr: "Show all command",
    descriptionen: "Ask an question to the bot",
    usage: "`.help`",
    botPermissions: [],
    userPermissions: [ "ADMINISTRATOR" ],
    blacklists: true,
    staffOnly: false, 
    ownerOnly: false,
    disabled: false
}