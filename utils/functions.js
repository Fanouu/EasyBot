const { Guild } = require(".././models.main.js")

client.getGuild = async guild =>  {
    const data = await Guild.findOne({ guildID: guild.id})
    if(data) return data;
};