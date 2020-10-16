import { CONFIG } from './config';
import { Tail } from 'tail';
import get from 'lodash/get';
import dateFormat from 'dateformat';
const tailAdm = new Tail(CONFIG.LOG_ADM_LOCATION, { useWatchFile: true });
const tailServerLog = new Tail(CONFIG.LOG_SERVERLOG_LOCATION, { useWatchFile: true });
const Discord = require('discord.js');
const client = new Discord.Client();
import { sendMessage, maybeRespond, loopDiscordMessage } from './lib/discord';
import { rcon, getPlayerCount } from './lib/rcon';
import { formatServerLogLine, getQueue } from './lib/serverLogs';

let playerCount = 0;
let queueCount = 0;

const updatePlayerCount = count => {
    playerCount = count;
    updatBotStatus(playerCount, queueCount);
};

const updateQueueCount = count => {
    queueCount = count;
    updatBotStatus(playerCount, queueCount);
};

export const updatBotStatus = (playerCount, queueCount) => {
    const queue = queueCount > 0 ? ` (+${queueCount})` : '';
    const status = `${playerCount}/${CONFIG.MAX_PLAYERS}${queue}`;
    console.log(`${dateFormat(new Date(), 'yyyy-mm-dd | HH:MM:ss |')} Updating bot status to: ${status}`);
    if (CONFIG.DISCORD.ENABLE_PLAYER_COUNT_STATUS) client.user.setActivity(status, { details: "DayZ" });
};

client.once('ready', () => {
    console.info(`Logged in as ${client.user.tag}!`);

    if (CONFIG.DISCORD.ENABLE_LOGS) {
        tailAdm.on('line', line => {
            const formattedLine = formatServerLogLine(line);
            if (formattedLine) sendMessage(formattedLine, client);
            if (get(formattedLine, 'type.id') === 'CONNECTION' && CONFIG.DISCORD.ENABLE_PLAYER_QUEUE_STATUS) getPlayerCount(updatePlayerCount);
        });
    }

    if (CONFIG.DISCORD.ENABLE_PLAYER_QUEUE_STATUS) {
        tailServerLog.on('line', line => {
            getQueue(line, updateQueueCount);
        });
    }

    //loopDiscordMessage(client, 3600000);
});

client.on('message', msg => {
    if (CONFIG.DISCORD.ENABLE_RESPONSE) maybeRespond(msg);
});
  

client.login(CONFIG.DISCORD.BOT_TOKEN);