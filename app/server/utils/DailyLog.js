import tracer from 'tracer';

export default tracer.dailyfile({root:'.', maxLogFiles: 10, allLogsFileName: 'DevToolsCollection'});