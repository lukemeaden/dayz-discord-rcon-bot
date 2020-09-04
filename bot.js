import { CONFIG } from './config';
import { Tail } from 'tail';
const tail = new Tail(CONFIG.LOG_ADM_LOCATION, { useWatchFile: true });
const Discord = require('discord.js');
const client = new Discord.Client();
import { sendMessage, maybeRespond } from './lib/discord';
import { rcon } from './lib/rcon';
import { formatServerLogLine } from './lib/serverLogs';

client.once('ready', () => {
    console.info(`Logged in as ${client.user.tag}!`);

    if (CONFIG.DISCORD.ENABLE_LOGS) {
        tail.on('line', line => {
            const formattedLine = formatServerLogLine(line);
            if (formattedLine) sendMessage(formattedLine, client);
        });
    }

    if (CONFIG.DISCORD.ENABLE_PLAYER_COUNT_STATUS) rcon(client);
});

client.on('message', msg => {
    if (CONFIG.DISCORD.ENABLE_RESPONSE) maybeRespond(msg);
});
  

client.login(CONFIG.DISCORD.BOT_TOKEN);