const Discord = require("discord.js");
const fs = require("fs");

const { Client, MessageEmbed } = require('discord.js');

const cfg = require("./config.json");


const client = new Discord.Client();
const { Player } = require("discord-player");
const player = new Player(client);
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.class = new Discord.Collection(); 
client.categories =fs.readdirSync('./commands/');
client.queue = new Map()
client.player = player;


const { GiveawaysManager } = require("discord-giveaways");

const manager = new GiveawaysManager(client, {
    storage: "./giveaways.json",
    updateCountdownEvery: 10000,
    default: {
        botsCanWin: false,
        exemptPermissions: [ "MANAGE_MESSAGES", "ADMINISTRATOR" ],
        embedColor: "#FF0000",
        reaction: "🎁"
    }
});

client.giveawaysManager = manager;

const loadCommands = (dir = "./commands/") => {
    fs.readdirSync(dir).forEach(dirs => {
        const commands = fs.readdirSync(`${dir}/${dirs}/`).filter(files => files.endsWith(".js"));
        client.class.set(dirs);
        if(commands.length <= 0){
            console.log("Commands folder is empty or missing !");
            return;
        }
        for(const file of commands) {
            const getFileName = require(`${dir}/${dirs}/${file}`);
            client.commands.set(getFileName.help.name, getFileName);
            getFileName.help.aliases.forEach(alias => { 
                client.aliases.set(alias, getFileName.help.name);
            });
            console.log(`Command: '${getFileName.help.name}' (${dirs}) was successfully loaded !`);
        };
    });
};

loadCommands();

fs.readdir('./events/', (err, files) => {
    if(err) return console.log(err);
    files.forEach(file => {
      if (!file.endsWith('.js')) return;
      const evt = require(`./events/${file}`);
      let evtName = file.split('.')[0];
      console.log(`Event: '${evtName}' was successfully loaded !`);
      client.on(evtName, evt.bind(null, client));
    });
  });   
  
  client.player.on('trackStart', (message, track) => message.channel.send(`Now playing ${track.title}...`))
  

client.login(cfg.bot.token);