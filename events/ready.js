const cfg = require("../config.json");

module.exports = client => {

    console.log(`================= \n${client.user.username} is ready ! (${client.user.id}) \nAt ${client.guilds.cache.size} guilds \n=================`)

    let commandCount = client.commands.size;

    let jeuxs = [
        `.help | ${client.guilds.cache.size} serveurs`,
        `.help | ${client.users.cache.size} personnes`,
        `.help | ${client.channels.cache.size} channels`,
        `.help | ${client.guilds.cache.size} serveurs`
        ];
let index = 0
setInterval(() => {
        const activities_list = [
            "%help | " + client.users.cache.size + " utilisateurs 👤",
            "%help | " + commandCount + " commands 📚",
            "%help | v " + cfg.bot.version + " 💻 ",
            "Made on 💻 with ❤️ by Fan"

        ];

        client.user.setPresence({activity: {name: activities_list[index], type: "WATCHING"}, status: 'online'})
        index++
        if (index > (activities_list.length - 1)) index = 0

    }, 7000);    
};