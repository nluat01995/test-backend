const { round } = require('lodash');
const { db } = require('../database/connection.db');
const _SECONDS = 5000;
const os = require('os');
const process= require('process');

const checkHealth = ()=>{
    setInterval(async()=>{
        const result = await db.raw('SHOW PROCESSLIST');
        const activeConnections = result.length;
        console.log(`Number of active MySQL connections: ${activeConnections}`)
        const numCores = os.cpus().length;
        const memoryUsage = process.memoryUsage().rss;
        const maxConnection = numCores * 5;
        console.log('Memory usage:::',round(memoryUsage/1024/1024,0) ,'MB');
        if(activeConnections > maxConnection){
            console.log('Connection overload');
        }
    },_SECONDS)
}
module.exports = {
    checkHealth
}