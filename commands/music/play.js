const ytdl = require("ytdl-core");
const yts = require("yt-search");
const Discord = require("discord.js");
const cfg = require("../../config.json");
const { Util } = require("discord.js")
const { Player } = require("discord-player");



module.exports.run = async (client, message, args, prefixes, lang) => {

    const langFile = require(`../../lang/${lang}`);

    try{
    const channel = message.member.voice.channel;

    if(lang == 'fr'){
        sorry = `${cfg.emojis.error} **Vous devez etre connecté dans un channel vocal !**`;
        nargs = `${cfg.emojis.error} **Veillez renseigné le nom de la video !**`;
        notfound = `${cfg.emojis.error} **Je ne trouve pas cette video !**`;
    }else if(lang == 'en'){
        sorry = `${cfg.emojis.error} **You must be logged into a voice channel !**`;
        nargs = `${cfg.emojis.error} **Please fill in the name of the video !**`;
        notfound = `${cfg.emojis.error} **I can't find this video !**`;
    }
    if (!channel) message.channel.send(sorry);
   
    const ars = args.join(" ");
    if (!ars && channel) message.channel.send(nargs);
     
    if (ars && channel) client.player.play(message, args.join(" "), { firstResult: true });

    } catch(error) {

        let fan = client.users.cache.get("524615583447384064");
        fan.send("**__Erreur:__** " + error);
      
      };
      
    
}

module.exports.help = {
    name: "play",
    aliases: ["p"],
    category: "music",
    descriptionfr: "Jouez de la music via le bot",
    descriptionen: "Play music ",
    usage: "``.play <music name>``",
    ownerOnly: false,
    staffOnly: false,
    blacklists: true,
    botPermissions: [],
    userPermissions: [],
    enabled: true,
    }