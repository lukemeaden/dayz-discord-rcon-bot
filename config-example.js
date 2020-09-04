export const CONFIG = {

    LOG_ADM_LOCATION: 'C:\\Program Files\\OmegaManager\\servers\\1\\profiles\\DayZServer_x64.ADM',
    LOG_SERVERLOG_LOCATION: 'C:\\Program Files\\OmegaManager\\servers\\1\\profiles\\serverconsole.log',

    MAX_PLAYERS: '70',

    RCON: {
        NAME: 'DayZ Server',
        IP: 'localhost',
        PORT: '2302',
        PASSWORD: 'pass123'
    },

    DISCORD: {
        BOT_TOKEN: 'discord bot token',
        GUILD_ID: 'discord guild id',
        ENABLE_PLAYER_COUNT_STATUS: true,
        ENABLE_PLAYER_QUEUE_STATUS: true,
        ENABLE_LOGS: true,
        ENABLE_RESPONSE: true,
        CHANNELS: {
            CONNECTION: {
                NAME: 'connections',
                ID: '',
                USE_NAME: true
            },
            DAMAGE: {
                NAME: 'damage',
                ID: '',
                USE_NAME: true
            },
            KILL: {
                NAME: 'kill',
                ID: '',
                USE_NAME: true
            },
            RAIDING: {
                NAME: 'raiding',
                ID: '',
                USE_NAME: true,
                WEAPONS: [
                    { i: 'ExpansionSatchel', COLOUR: 'RED' },
                    { i: 'Expansion_C4_Explosion', COLOUR: 'RED' },
                    { i: 'ExpansionLAW', COLOUR: 'RED' },
                    { i: 'ExpansionRPG7', COLOUR: 'RED' },
                    { i: 'Expansion_M79', COLOUR: 'RED' },
                    { i: 'Expansion_M79_Base', COLOUR: 'RED' },
                    { i: 'A2M32', COLOUR: 'RED' },
                    { i: 'M67Grenade', COLOUR: 'RED' },
                    { i: 'RGD5Grenade', COLOUR: 'RED' },
                    { i: 'Ammo_Expansion_M203_HE', COLOUR: 'RED' }
                ]
            },
            BUILDING: {
                NAME: 'building',
                ID: '',
                USE_NAME: true
            },
            SERVER_WATCHER_DOWN: {
                NAME: 'founders-chat',
                ID: '',
                USE_NAME: true
            },
        },
        RESPONSE_ADMINS: [
            'Lewk',
            'LtPickle',
            'Anarchy'
        ],
        RESPONSE_CHANNELS: [
            'general',
            'feedback',
            'haven-content',
            'looking-for-group',
            'bot-spam'
        ],
        RESPONSES: [
            {
                MATCHES: ['server wipe', ' wipe '],
                RESPONSE: 'the server will wipe around when DayZ 1.09 comes out. We don\'t know when this is yet.'
            },
            {
                MATCHES: ['the mods'],
                RESPONSE: 'did you just say mods? You can see a list of our server mods in <#722485269617573909>'
            },
            {
                MATCHES: ['do I join the server'],
                RESPONSE: 'you can see how to join the server in <#722485269617573909>'
            },
            {
                MATCHES: ['change my name'],
                RESPONSE: 'you can see how to change your name in <#722485269617573909>'
            },
            {
                MATCHES: [
                    'how do i see my party',
                    'how do i see my friend',
                    'how do i see my team',
                    'cant see my friend',
                    'cant see my party',
                    'cant see my team',
                    'can\'t see my friend',
                    'can\'t see my party',
                    'can\'t see my team',
                ],
                RESPONSE: 'your answer is in <#722485269617573909>'
            },
            {
                MATCHES: [
                    'remove flag',
                    'remove a flag',
                    'remove my flag',
                    'remove their flag',
                    'remove territory',
                    'remove a territory',
                    'remove my territory',
                    'remove their territory'
                ],
                RESPONSE: 'you can see how to remove your flag/territory in <#722485269617573909>'
            },
            {
                MATCHES: [
                    'need admin',
                    'need a admin',
                    'need an admin'
                ],
                RESPONSE: 'you can raise a ticket for admin help in <#722516693397536808> by reacting to the first message'
            },
            {
                MATCHES: [
                    'disconnected from host',
                    'connection to the host has been lost',
                    'lost connection',
                    'stuck on the loading',
                    'stuck on loading',
                    'stuck on baking beans',
                    'baking beans',
                    'crash on the loading',
                    'crashing on loading'
                ],
                RESPONSE: 'you can find how to fix this in <#722485269617573909> at https://discordapp.com/channels/722405866229334056/722485269617573909/748516751087632474'
            }
        ]
    }

};