const utils = require("../../utils")

/**
 * Método faz o join da mensagem pelo prefixo do break
 * @param messages Array de mensagens que será feito o join
 * @returns {string} String unica com todas as posições do array separados por ~break~
 */
const JoinMessagesToSanitizeResponse = (messages) => {
    return messages.join("~break~");
}

/**
 * Método que busca o help de um comando, sendo ele restrito ou não, caso o comando não exista ele dá uma mensagem amigável
 * @param username Usuário do @ quem pediu ajuda
 * @param req Requisição solicitada após o ajuda, caso seja um Array Vazio o comando solicitado a ajuda é o próprio
 * @param commands Comandos cadastrados para o canal
 * @param ignored Lista de comandos ignorados para o canal
 * @returns {string} Retorna uma array de string com o join de ~break~ para saber quando tem que separar (Mustache não gera um array ele coloca erroneamente um array dentro da string)
 */
module.exports = ({ twitch: { context: { username } }, context: { req, commands, ignored} }) => {
    let action = "help";
    if (req.length != 0) { action = req.shift(); }

    const { find, reserved, command } = utils.findCommandByAction(action, ignored, commands);
    const isReservedCommandSearch = reserved == true;
    const isAnUnknowCommandOrWithoutHelp = find == false || find == true && typeof command?.help != "string";

    if (isReservedCommandSearch) { return JoinMessagesToSanitizeResponse(["/color HotPink", `/me @${username} Esse comando ${action} é reservado (Só tenho permissão para falar isso) Kappa`]); }
    if (isAnUnknowCommandOrWithoutHelp) { return JoinMessagesToSanitizeResponse(["/color HotPink", `/me @${username} Olha eu nem sei como te ajudar com o commando ${action} se nem sei o que é WutFace`]); }

    return JoinMessagesToSanitizeResponse(["/color YellowGreen", `/me Olha @${username} achei isso aqui, ajuda? ${command.help}`]);
}