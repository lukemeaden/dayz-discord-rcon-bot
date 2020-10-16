import { CONFIG } from '../config';
import { LOG_TYPES } from '../lib/constants'
import get from 'lodash/get';
import { getMapLinkFromCoords } from './serverLogs';

let raidLine = [];

const getMessageContent = msg => get(msg, 'content') !== 'undefined' ? get(msg, 'content') : null;

const getResponse = msg => CONFIG.DISCORD.RESPONSES.find(r => r.MATCHES.find(f => getMessageContent(msg).toLowerCase().includes(f.toLowerCase())));

export const maybeRespond = msg => {
    const response = getResponse(msg);
    if (response && !msg.author.bot && !CONFIG.DISCORD.RESPONSE_ADMINS.includes(msg.author.username)) {
        msg.reply(response.RESPONSE);
    }
};

const getChannelByName = (client, name) => client.channels.cache.find(channel => channel.name === name);

const getChannelById = (client, id) => client.channels.cache.find(channel => channel.id === id);

const getChannel = (id, client) => {
    const cCfg = CONFIG.DISCORD.CHANNELS[id];
    const useName = get(cCfg, 'USE_NAME');
    const cid = get(cCfg, 'ID');
    const name = get(cCfg, 'NAME');
    if (useName && name !== '') {
        return getChannelByName(client, name);
    } else if (!useName && cid !== '') {
        return getChannelById(client, cid);
    }
    return null;
};

const formatMessage = data => {
    const { date, time, player, coords, type, line } = data;
    switch (true) {
        case type.id === 'CONNECTION':
            const name = `${date} | ${time} | '${player.name}' has ${line.includes('disconnected') ? 'disconnected' : 'connected'}`;
            return {
                color: type.colour,
                author: { name },
                timestamp: time
            };
        case type.id === 'BUILDING':
            const formatMessage = line.replace(/(^Player "(.*?)>\) |^(.*?) \[steam(.*?)\> )/gm.exec(line)[0], '');
            return {
                color: type.colour,
                url: get(coords, 'link'),
                author: {
                    name: `${date} | ${time} | '${player.name}' ${formatMessage}`,
                    url: get(coords, 'link')
                },
                timestamp: time
            };
        case type.id === 'SERVER_WATCHER_DOWN':
            return {
                color: type.colour,
                author: { name:  `${time} | SERVER WATCHER IS DOWN` },
                description: 'Log into your server and remove the Server Watcher and Server Tracker mods'
            }
        default:
            return {
                color: type.colour,
                url: get(coords, 'link'),
                author: {
                    name: `${date} | ${time} | '${player.name}'`,
                    url: get(coords, 'link')
                },
                description: line,
                timestamp: time
            };
    };
};

const formatRaidMessage = data => {
    console.log(data);
    if (data.length !== 3) return null;
    const player = get(/Player "(.*?)\(ID/gm.exec(data[0].line), '[1]');
    const baseObject = /(part \((.*?)\))/gm.exec(data[0].line)[2];
    const startingHealth = /(\)\( (.*?)current)/gm.exec(data[0].line)[2];
    const damage = /dealt (.*?) damage/gm.exec(data[1].line)[1];
    const weapon = /with a (.*?)</gm.exec(data[1].line)[1];
    const hasMatchingWeapon = get(CONFIG.DISCORD.CHANNELS.RAIDING.WEAPONS.filter(w => w.i === weapon), '[0].COLOUR');
    const color = hasMatchingWeapon ? hasMatchingWeapon : data[0].type.colour;
    const coords = /at <(.*?)>$/gm.exec(data[1].line)[1];
    const url = getMapLinkFromCoords(coords, true);
    const endingHealth = /applied: (.*?)$/gm.exec(data[2].line)[1];
    return {
        color,
        url,
        author: {
            name: `${data[0].date} | ${data[0].time} | '${player}' damaged ${baseObject} with ${weapon}`,
            url
        },
        fields: [
            { name: 'Starting health', value: startingHealth, inline: true },
            { name: 'Damage done', value: damage, inline: true },
            { name: 'Health after damage', value: endingHealth, inline: true },
        ],
        timestamp: data[0].time
    }
};

export const sendMessage = (data, client) => {
    const { line, type } = data;
    const channel = getChannel(type.id, client);
    if (channel !== undefined ) {
        if ( type.id === 'RAIDING' ) {
            switch (true) {
                case line.includes(LOG_TYPES.RAIDING.END):
                    channel.send({ embed: formatRaidMessage(raidLine) });
                    raidLine = [];
                case line.includes(LOG_TYPES.RAIDING.START):
                    break;
                default:
                    raidLine.push(data);
                    break;
            }
        } else {
            channel.send({ embed: formatMessage(data) });
        }
    }
};

export const loopDiscordMessage = (client, timeout) => setTimeout(() => {
    getChannelByName(client, 'general').send('I\'ve put together a small survey about weapons, if you have time please check it out. Cheers, Lewk \n https://forms.gle/bqceBmAMSUgedCXC9')
    loopDiscordMessage(client, timeout);
}, timeout);