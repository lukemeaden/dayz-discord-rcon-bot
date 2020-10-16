import get from 'lodash/get';
import {
    IGNORED_LOG_LINES,
    IGNORED_LOG_LINES_CONTAINING,
    LOG_TYPES
} from './constants';
import dateFormat from 'dateformat';

export const formatServerLogLine = logLine => {
    if (logLine !== undefined) {
        const data = logLine
          .replace(' [ServerWatcher | Config]', '')
          .replace(' [ServerWatcher | Hack]', '')
          .replace(' [ServerWatcher | Dupe]', '');
        
        const splitData = data.split(' | ');

        const time = splitData[0];
        const line = splitData[1];
        const date = dateFormat(new Date(), 'yyyy-mm-dd');

        if (!IGNORED_LOG_LINES.some(l => logLine === l) && !IGNORED_LOG_LINES_CONTAINING.some(l => logLine.includes(l))) {
            const player = getPlayerFromLine(line);
            const coords = getCoords(line);
            const type = getLineType(logLine);
            return { date, time, player, coords, type, line };
        }

        return null;
    }

    return null;
};

const getLineType = line => {
    const lineType = {};
    Object.keys(LOG_TYPES).forEach(type => {
        LOG_TYPES[type].INCLUDES.forEach(i => {
            if (line.includes(i.i)) {
                lineType.id = type;
                lineType.colour = i.COLOUR;
            }
        });
    });
    return lineType;
};

const getPlayerFromLine = line => {
    const regName = /(^Player "(.*?)"|(.*?) \[steam64: |Chat\("(.*?)"|^BaseRaiding: Player "(.*?)\()/gm.exec(line);
    let name;
    if (get(regName, '[2]') !== undefined) {
        name = get(regName, '[2]');
    } else if (get(regName, '[3]') !== undefined) {
        name = get(regName, '[3]');
    } else if (get(regName, '[4]') !== undefined) {
        name = get(regName, '[4]');
    }
    const id = get(/(\(id=|\(ID = ")(.*?)(= |=\))/gm.exec(line), '[2]');
    const guid = id ? `${id}=` : undefined;
    const steamid = get(/(\(STEAM64:|\[steam64: )(.*?)(\)|;])/gm.exec(line), '[2]');
    return {
        id: steamid ? steamid : guid,
        name
    };
};

const getCoords = line => {
    const coords = get(/\<(.*?)\>/g.exec(line), '[1]');
    if (coords) {
        const link = getMapLinkFromCoords(coords);
        return { coords, link };
    }
    return null;
};

export const getMapLinkFromCoords = (coords, isRaid) => {
    const url = 'https://dayz.ginfo.gg/#location=';
    const splitCoords = coords.split(', ');
    if (isRaid)  return `${url}${Number(splitCoords[0]).toFixed(1)};${Number(splitCoords[2]).toFixed(1)};4`;
    return `${url}${Number(splitCoords[0]).toFixed(1)};${Number(splitCoords[1]).toFixed(1)};4`
};

export const getQueue = (line, updateQueue) => {
    if (line.indexOf('login queue at position ') > 0) {
        const queueCount = get(/(login queue at position )(.*)/gm.exec(line), '[2]');
        if (queueCount) updateQueue(Number(queueCount));
    }
};