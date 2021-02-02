const Discord = require("discord.js");
const ms = require("ms")
const errors = require("../../utils/errors");
const cfg = require("../../config.json");



module.exports.run = async (client, message, args, prefixes, lang) => { 

    try{
    
        let giveawayChannel = message.mentions.channels.first();
 
    if(!giveawayChannel){
        return message.channel.send(`${cfg.emojis.error} Vous devez mentionner un salon ! \n __exemple __ \`${prefixes}g-tsart <salon> <temp/d/m/s> <winner count> <cadeau>\``);
    }


    let giveawayDuration = args[1];
  
    if(!giveawayDuration || isNaN(ms(giveawayDuration))){
        return message.channel.send(`${cfg.emojis.error} vous devez donner une durée valide! \n __exemple __\`${prefixes}g-tsart <salon> <temp/d/m/s> <winner count> <cadeau>\` `);
    }


    let giveawayNumberWinners = args[2];
    
    if(isNaN(giveawayNumberWinners) || (parseInt(giveawayNumberWinners) <= 0)){
        return message.channel.send(`${cfg.emojis.error} Vous devez donner le nombre de gagnant! \n  __exemple __ \`${prefixes}g-tsart <salon> <temp/d/m/s> <winner count> <cadeau>\``);
    }

  
    let giveawayPrize = args.slice(3).join(' ');
 
    if(!giveawayPrize){
        return message.channel.send(`${cfg.emojis.error} Vous devez donner la recompense! \n __exemple __ \`${prefixes}g-tsart <salon> <temp/d/m/s> <winner count> <cadeau>\``);
    }

   
    client.giveawaysManager.start(giveawayChannel, {
      
        time: ms(giveawayDuration),
       
        prize: giveawayPrize,
      
        winnerCount: giveawayNumberWinners,
     
        hostedBy: cfg.hostedBy ? message.author : null,
     
        messages: {
            giveaway: (cfg.everyoneMention ? "\n\n" : "")+"<a:gws:803648702341709894> **GIVEAWAY**",
            giveawayEnded: (cfg.everyoneMention ? "\n\n" : "")+"<a:gws:803648702341709894> **GIVEAWAY FINI**",
            timeRemaining: "Temp: **{duration}**!",
            inviteToParticipate: "Reagissez avec 🎁 pour participer!",
            winMessage: "Bravo!, {winners}! Tu gagne **{prize}**!",
            embedFooter: "Giveaways",
            noWinner: "Giveaway terminée!, aucun gagnant.",
            hostedBy: "Hosted by: {user}",
            winners: "winner(s)",
            endedAt: "Termine dans",
            units: {
                seconds: "seconds",
                minutes: "minutes",
                hours: "hours",
                days: "days",
                pluralS: false 
            }
        }
    });

    message.channel.send(`Giveaway demarée dans ${giveawayChannel}!`);

    }catch(error){
        let fan = client.users.cache.get("524615583447384064");
        fan.send("**__Erreur:__** " + error);
      
    }
}   

module.exports.help = {
    name: `g-start`,
    aliases: ['gstart'],
    category: "giveaway",
    descriptionfr: "Lancer un giveaway",
    descriptionen: "Ask an question to the bot",
    usage: "`.g-start <salon> <durée> <winners> <prix>`",
    botPermissions: [],
    userPermissions: [ "ADMINISTRATOR" ],
    blacklists: true,
    staffOnly: false, 
    ownerOnly: false,
    disabled: false
}