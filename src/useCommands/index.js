const count = require("./count/count");
const ajuda = require("./ajuda/ajuda")

module.exports = (args) => {
    return {
        count: count(args),
        ajuda: ajuda(args)
    }
}