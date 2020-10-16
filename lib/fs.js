import fs from 'fs';

const writePlayerCount = count => {
    fs.writeFile(‘count/player.js’, count);
};

const writeQueueCount = count => {
    fs.writeFile(‘count/queue.js’, count);
};