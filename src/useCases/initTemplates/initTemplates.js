const LRU = require("lru-cache");
const cache = new LRU();

const path = require("path")
const fs = require('fs').promises;

const initializer = async (channel = "") => {
    channel = channel.substring(1,channel.length);
    let channelCommands, commonCommands;

    if (cache.get(`commands.${channel}.json`)) { return JSON.parse(cache.get(`commands.${channel}.json`))}

    [channelCommands, commonCommands] = await Promise.all([
        fs.readFile(path.resolve(`commands.${channel}.json`), "UTF-8").catch(() => null),
        fs.readFile(path.resolve(`commands.json`), "UTF-8").catch(() => null),
    ])

    if (channelCommands != null) {
        cache.set(`commands.${channel}.json`, channelCommands);
        return JSON.parse(channelCommands);
    }

    cache.set(`commands.${channel}.json`, commonCommands);
    return JSON.parse(commonCommands);
}


module.exports = initializer