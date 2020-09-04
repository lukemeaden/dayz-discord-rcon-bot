export const IGNORED_LOG_LINES = [
    " (31)"
];

export const IGNORED_LOG_LINES_CONTAINING = [
    "Refreshed settings. Next refresh in",
    "CFAPIChatExpansion",
    "Chat(\""
];

export const LOG_TYPES = {
    CONNECTION: {
        INCLUDES: [
            { i: 'is connected', COLOUR: 'DARK_GREEN' },
            { i: 'has been disconnected', COLOUR: 'DARK_RED' }
        ]
    },
    DAMAGE: {
        INCLUDES: [
            { i: 'hit by', COLOUR: 'ORANGE' },
            { i: 'is unconscious', COLOUR: 'RED' },
            { i: 'regained consciousness', COLOUR: 'BLUE' }
        ]
    },
    KILL: {
        INCLUDES: [
            { i: 'killed by', COLOUR: 'RED' },
            { i: 'comitted suicide', COLOUR: 'RED' },
            { i: 'died.', COLOUR: 'RED' },
            { i: 'bled out', COLOUR: 'RED' }
        ]
    },
    RAIDING: {
        INCLUDES: [
            { i: '------------------------- Expansion BaseRaiding Damage Report -------------------------', COLOUR: false }, // DO NOT CHANGE THIS LINE
            { i: '--------------------------------------------------------------------------------------', COLOUR: false }, // DO NOT CHANGE THIS LINE
            { i: 'BaseRaiding', COLOUR: 'GREY' }, // DO NOT CHANGE THIS LINE
        ],
        START: '------------------------- Expansion BaseRaiding Damage Report -------------------------', // DO NOT CHANGE THIS LINE
        END:  '--------------------------------------------------------------------------------------' // DO NOT CHANGE THIS LINE
    },
    BUILDING: {
        INCLUDES: [
            { i: 'placed', COLOUR: 'PURPLE' },
            { i: 'deployed Flag Kit - Expansion', COLOUR: 'AQUA' },
            { i: 'built', COLOUR: 'LUMINOUS_VIVID_PINK' },
            { i: 'dismantled', COLOUR: 'YELLOW' },
            { i: 'deployed', COLOUR: 'BLUE' }
        ]
    },
    SERVER_WATCHER_DOWN: {
        INCLUDES: [
            { i: '[GT1ServersTracker] Can\'t contact master server, stopping server...', COLOUR: 'RED' }
        ]
    }
};