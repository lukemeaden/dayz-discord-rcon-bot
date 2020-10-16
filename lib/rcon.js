import get from 'lodash/get';
import { Socket } from 'battleye';
import { CONFIG } from '../config';
const { RCON, MAX_PLAYERS } = CONFIG;

const socket = new Socket({
    port: 2310,
    ip: '0.0.0.0'
});

export const connection = CONFIG.DISCORD.ENABLE_PLAYER_QUEUE_STATUS && socket.connection({
    name: RCON.NAME,
    password: RCON.PASSWORD,
    ip: RCON.IP,
    port: RCON.PORT
}, {
    reconnect: true,
    reconnectTimeout: 500,
    keepAlive: true,
    KeepAliveInterval: 120000,
    timeout: true,
    timeoutInterval: 120000,
    serverTimeout: 30000,
    packetTimeout: 1000,
    packetTimeoutThesholded: 3
});

export const getPlayerCount = (updatePlayerCount) => {
    connection.command('players').then(response => {
        const playersToArray = response.data.split(/\r?\n/);
        const playerCount = get(playersToArray[playersToArray.length - 1].match(/\d+/g), '[0]');
        updatePlayerCount(Number(playerCount));
    }).catch(console.error);
};

export const rcon = (client, updatePlayerCount, queueCount) => {

    connection.on('disconnected', (reason) => {
        console.warn(`Disconnected from ${connection.ip}:${connection.port},`, reason);
    });

    connection.on('connected', () => {
        console.error(`Connected to ${connection.ip}:${connection.port}`);
        getPlayerCount(connection, updatePlayerCount);
    });
 
    connection.on('error', (err) => {
        console.error(`CONNECTION ERROR:`, err);
    });

};