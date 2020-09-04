import get from 'lodash/get';
import { Socket } from 'battleye';
import { CONFIG } from '../config';
const { RCON, MAX_PLAYERS } = CONFIG;

const socket = new Socket({
    port: 2310,
    ip: '0.0.0.0'
});

const connection = socket.connection({
    name: RCON.NAME,
    password: RCON.PASSWORD,
    ip: RCON.IP,
    port: RCON.PORT
}, {
    reconnect: true,
    reconnectTimeout: 500,
    keepAlive: true,
    KeepAliveInterval: 10500,
    timeout: true,
    timeoutInterval: 10000,
    serverTimeout: 30000,
    packetTimeout: 1000,
    packetTimeoutThesholded: 5
});

const updateBotStatus = (connection, client) => {
    connection.command('players')
    .then(response => {
        const playersToArray = response.data.split(/\r?\n/);
        const playerCount = playersToArray[playersToArray.length - 1].match(/\d+/g)[0];
        const players = `${playerCount}/${MAX_PLAYERS}`;
        client.user.setActivity(players, { details: "DayZ" });
    }).catch(console.error);
};

export const rcon = client => {

    socket.on('received', ( resolved, packet, buffer, connection, info ) => {
        const message = get(packet, 'attributes.message');
        const isConnection = message && (message.includes('connected') || message.includes('disconnected') || message.includes('kicked'));
        if (isConnection) {
            updateBotStatus(connection, client);
        }
    });

    connection.on('disconnected', (reason) => {
        console.warn(`Disconnected from ${connection.ip}:${connection.port},`, reason)
    });

    connection.on('connected', () => {
        console.error(`Connected to ${connection.ip}:${connection.port}`)
    });
  
      connection.on('error', (err) => {
        console.error(`CONNECTION ERROR:`, err);
        setTimeout(connection, 60000);
    });

};