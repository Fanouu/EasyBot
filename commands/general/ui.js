const Discord = require("discord.js");
const cfg = require("../../config.json");
const errors = require("../../utils/errors.js");

module.exports.run = async (client, message, args, prefixes) => { 
    
    const users = message.author;
   const member = message.mentions.members.first()

 try{


    const embeds = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setAuthor(users.username, users.avatarURL())
    .setDescription(`information for ${users}`)
    .addField(":id: ❯ ID", users.id)
    .addField(":bust_in_silhouette: ❯ Name", users.username)
    .addField(":pushpin: ❯ Account create", users.createdAt)

        if (!member)
            return message.channel.send(embeds);


        const embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setAuthor(member.user.username, member.user.avatarURL())
            .setDescription(`information for ${member}`)
            .addField(":id: ❯ ID", member.user.id)
            .addField(":bust_in_silhouette: ❯ Name", member.user.username)
            .addField(":pushpin: ❯ Account create", member.user.createdAt)
            .addField(" :stopwatch: ❯ Join the server", member.joinedAt)
            .addField(":mag: ❯ roles", member.roles.cache.map(r => `${r}`).join(' , '));

        message.channel.send(embed);
 } catch(error) {

  let fan = client.users.cache.get("524615583447384064");
  fan.send("**__Erreur:__** " + error);

};

}

module.exports.help = {
    name: "userinfo",
    aliases: ["ui"],
    category: "general",
    descriptionfr: "Information sur l'utilisateur",
    descriptionen: "User Information",
    usage: "``.userinfo`` \ ``.userinfo <user>``",
    ownerOnly: false,
    staffOnly: false,
    blacklists: true,
    botPermissions: [],
    userPermissions: [],
    enabled: true,
    }