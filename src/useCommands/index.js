const count = require("./count/count");
const ajuda = require("./ajuda/ajuda")

module.exports = (args) => {
    return {
        count: () => { return count(args) },
        ajuda: () => { return ajuda(args) },
        funcaoComandoConsole: () => { console.log("Oie") }
    }
}