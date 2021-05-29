"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Este método concentra os erros na hora de usar um comando, ou executar uma função do partials, ele manda uma
 * mensagem no chat alertando e registra no console o erro gerado com trace!
 * @param client Client conectado com o IRC da Twitch
 * @param target Canal para onde deve ser enviado a mensagem
 * @param username Username do usuário que enviou o comando
 * @param action Comando solicitado pelo @
 * @param error Erro com trace do ocorrido e mensagem
 */
var sendErrorCommand = function (client, _a, error) {
    var _b = _a.twitch, target = _b.target, username = _b.context.username, action = _a.context.action;
    // Ternário que pega o usuário do dono do canal para utilizar na mensagem
    var owner = target.startsWith("#") ? target.substring(1, target.length) : target;
    var messages = [
        "/color Coral",
        "/me Nossa @" + username + " voc\u00EA me quebrou legal com esse comando a\u00ED " + action + " .... @" + owner + " eu deixei um log pra te ajudar a resolver essa bucha a\u00ED se vira!"
    ];
    messages.forEach(function (message) { return client.say(target, message); });
    console.error(error);
};
exports.default = sendErrorCommand;
