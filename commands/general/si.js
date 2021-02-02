const Discord = require("discord.js");
const cfg = require("../../config.json");
const errors = require("../../utils/errors.js");

module.exports.run = async (client, message, args, prefixes) => { 
    
    const user = message.author;
    const members = message.guild.members.cache;
    const channels = message.guild.channels.cache;
    const member = message.guild.member(user);
    const verificationLevels = {
	NONE: 'None',
	LOW: 'Low',
	MEDIUM: 'Medium',
	HIGH: '(╯°□°）╯︵ ┻━┻',
	VERY_HIGH: '┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻'
};
    
        let totalservers = client.guilds.cache.size;
        let totalbots = message.guild.members.cache.filter(member => member.user.client).size;

        const EmbedStats = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Statistiques')
            .setDescription('Voici les statistiques du serveur')
            .addField("**❯ Server Name:**",`${message.guild.name}`)
            .addField("**❯ Owner:**",`${message.guild.owner}`)
            .addField("**❯ Boost:**",`${message.guild.premiumSubscriptionCount || '0'} Boost(\`level ${message.guild.premiumTier ? `${message.guild.premiumTier}` : 'None'} \`)`)
            .addField("**❯ Verification Level:**", `${verificationLevels[message.guild.verificationLevel]}`)
            .addField("**❯ Salon Textuel:**",`${channels.filter(channel => channel.type === 'text').size}`)
            .addField("**❯ Salon Vocaux:**", `${channels.filter(channel => channel.type === 'voice').size}`)
            .addField("Roles",`${message.guild.roles.cache.map(roles => `${roles}`).join(', ')}`)
            .addField('**❯ Member Total:**',`${message.guild.memberCount}`)
            .addField("**❯ Humans:**",`${members.filter(member => !member.user.bot).size}`)
            .addField("**❯ Bots:**",`${members.filter(member => member.user.bot).size}`)
            .setTimestamp() 
            .setThumbnail(message.guild.iconURL())
            .setFooter(`Demandé par ${message.author.username}`);

        message.channel.send(EmbedStats);
     
}

module.exports.help = {
    name: "serverinfo",
    aliases: ["si"],
    category: "general",
    descriptionfr: "Information sur le server",
    descriptionen: "",
    usage: "``.serverinfo``",
    ownerOnly: false,
    staffOnly: false,
    blacklists: true,
    botPermissions: [],
    userPermissions: [],
    enabled: true,
    }