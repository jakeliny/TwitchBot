import path from "path";
import low from "lowdb";

const FileSync = require('lowdb/adapters/FileSync')

/**
 * Este método inicia um database lowdb utilizando o arquivo db.json como memory
 * @returns {db}
 */
const database = async () => {
    const adapter = new FileSync(path.resolve('src','database','db.json'));
    return low(adapter);
}

export default database();