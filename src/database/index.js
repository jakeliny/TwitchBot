const path = require("path")

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const initialize = () => {
    const adapter = new FileSync(path.resolve('src','database','db.json'))
    return low(adapter);
}

module.exports = initialize()