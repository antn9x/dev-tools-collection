import tracer from 'tracer';
import { blue, white, magenta, green, yellow, cyan, redBright, gray, grey } from 'chalk';

const logColor = (str, color1, color2, color3) => {
    const color3checked = color3 || color1;
    const color2checked = color2 || color1;
    const [timestamp, message, fileLine] = str.split('>>colors<<');
    return color1(timestamp) + color2checked(message) + color3checked(fileLine);
};

export default tracer.console({
    format: '{{timestamp}} [{{title}}] >>colors<< {{message}} >>colors<< ({{file}}:{{line}})',
    dateformat: 'HH:MM:ss.l',
    filters: [
        {
            log: (str) => logColor(str, blue, white, yellow),
            trace: (str) => logColor(str, magenta),
            debug: (str) => logColor(str, grey, blue, gray),
            info: (str) => logColor(str, green),
            warn: (str) => logColor(str, yellow),
            error: (str) => logColor(str, cyan, redBright, yellow),
        },
    ],
});
