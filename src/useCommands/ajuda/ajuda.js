const utils = require("../../utils")

module.exports = ({ twitch: { context: { username } }, context: { cmd, req, commands, ignored} }) => {
    // Verifica se a chamada tá vindo porque alguém pediu ajuda no comando!
    if (!cmd.actions.includes("ajuda")) return

    let action = "ajuda";
    if (req.length != 0) { action = req.shift() }

    const toHelp = utils.getCommandByAction(action, ignored, commands);
    if (toHelp == null) { return ["/color HotPink|", "/me @${username} Esse comando é reservado (Somente pessoas autorizadas) Kappa"] }
    if (toHelp.length == 0 || toHelp.ajuda == undefined) { return ["/color HotPink|", `/me @${username} Olha eu nem sei como te ajudar com o commando ${action} se nem sei o que é WutFace`] }

    return ["/color YellowGreen|", `/me @${username} Olha achei isso aqui... ajuda? ${toHelp.ajuda}`];
}