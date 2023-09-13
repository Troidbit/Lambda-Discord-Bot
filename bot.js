import 'dotenv/config';

import Eris from 'eris';
import {Constants} from 'eris';

const PORT = process.env.PORT || 3000;

const bot = new Eris(process.env.TOKEN,{
    intents:[
        "guildMessages"
    ]
});

bot.on("ready",() => {
    console.log("Ready!");

    const commands = bot.getCommands();

});

bot.on("error",(err) => {
    console.log(err);
});

bot.on("messageCreate",(msg)=>{
    let content=msg.content.toLowerCase();

    if(msg.author.username === 'cookietech' && (content === '!ping' || content === '!pong')) {
        bot.createMessage(msg.channel.id, {
            content: "no",
            allowedMentions:{ repliedUser: true },
            messageReference:{ messageID: msg.id }
        });
    } else {
        if(content === "!ping") {
            bot.createMessage(msg.channel.id, "Pong!");
        } else if (content === "!pong") {
            bot.createMessage(msg.channel.id, "Ping!");
        }
        else if (content === '!twitch=y') {
            //SUBSCRIBE TWITCH EVENT HANDLER
        }
        else if (content === '!twitch=n') {
            //UNSUBSCRIBE TWITCH EVENT HANDLER
        }
    }
});

bot.connect();