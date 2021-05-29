"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Este método sanitiza o retorno depois de ter passado pelo render (que chama as funções do useCommands, pois como o
 * comando ajuda para retornar um array dentro das mensagens é necessário salvar como string no render e pós render
 * quebrar as linhas novamente
 * @param find Verifica se o comando foi ou não encontrado
 * @param action O comando que foi solicitado
 * @param username O username de quem requisitou o comando
 * @param rendered O render do commands.json após os useCommands terem sidos acionados caso sejam necessários (json string)
 * @returns {{messages: string[]}|null|command}
 */
var getSanitizedRender = function (_a, rendered) {
    var _b = _a.context.cmd, find = _b.find, action = _b.action, username = _a.twitch.context;
    var parsed = JSON.parse(rendered);
    var isExistentCommand = find == true;
    if (!isExistentCommand)
        return { messages: ["/color Firebrick", "/me Ops @" + username + " acho que n\u00E3o existe esse comando " + action + " n\u00E3o hein Keepo"] };
    else if (parsed == null)
        return null;
    // Função que caso a mensagem for string transforma ela em Array separando por \n
    var sanitizeMessagesFromStringToArray = function (_a) {
        var messages = _a.messages;
        if (typeof messages == "string")
            return messages.split("~break~");
        return messages;
    };
    parsed.messages = sanitizeMessagesFromStringToArray(parsed);
    return parsed;
};
exports.default = getSanitizedRender;
