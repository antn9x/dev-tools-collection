import DailyLog from "../utils/DailyLog";

const logData = (data) => {
    DailyLog.log(`Client log: ${data}`);
};

export default logData;
