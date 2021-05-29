"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = __importDefault(require("../../utils/utils"));
/**
 * Método faz o join da mensagem pelo prefixo do break
 * @param messages Array de mensagens que será feito o join
 * @returns {string} String unica com todas as posições do array separados por ~break~
 */
var JoinMessagesToSanitizeResponse = function (messages) {
    return messages.join("~break~");
};
/**
 * Método que busca o help de um comando, sendo ele restrito ou não, caso o comando não exista ele dá uma mensagem amigável
 * @param username Usuário do @ quem pediu ajuda
 * @param req Requisição solicitada após o ajuda, caso seja um Array Vazio o comando solicitado a ajuda é o próprio
 * @param commands Comandos cadastrados para o canal
 * @param ignored Lista de comandos ignorados para o canal
 * @returns {string} Retorna uma array de string com o join de ~break~ para saber quando tem que separar (Mustache não gera um array ele coloca erroneamente um array dentro da string)
 */
var help = function (_a) {
    var username = _a.twitch.context.username, _b = _a.context, req = _b.req, commands = _b.commands, ignored = _b.ignored;
    var action = "help";
    if (req.length != 0) {
        action = req.shift();
    }
    var _c = utils_1.default.findCommandByAction(action, ignored, commands), find = _c.find, reserved = _c.reserved, command = _c.command;
    var isReservedCommandSearch = reserved == true;
    var isAnUnknowCommandOrWithoutHelp = find == false || find == true && typeof (command === null || command === void 0 ? void 0 : command.help) != "string";
    if (isReservedCommandSearch) {
        return JoinMessagesToSanitizeResponse(["/color HotPink", "/me @" + username + " Esse comando " + action + " \u00E9 reservado (S\u00F3 tenho permiss\u00E3o para falar isso) Kappa"]);
    }
    if (isAnUnknowCommandOrWithoutHelp) {
        return JoinMessagesToSanitizeResponse(["/color HotPink", "/me @" + username + " Olha eu nem sei como te ajudar com o commando " + action + " se nem sei o que \u00E9 WutFace"]);
    }
    return JoinMessagesToSanitizeResponse(["/color YellowGreen", "/me Olha @" + username + " achei isso aqui, ajuda? " + command.help]);
};
exports.default = help;
