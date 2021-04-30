const path = require("path");
const low = require('lowdb');

const FileSync = require('lowdb/adapters/FileSync')

/**
 * Este método inicia um database lowdb utilizando o arquivo db.json como memory
 * @returns {db}
 */
module.exports = () => {
    const adapter = new FileSync(path.resolve('src','database','db.json'));
    return low(adapter);
}