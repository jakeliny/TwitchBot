"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var count_1 = __importDefault(require("./count/count"));
var help_1 = __importDefault(require("./help/help"));
/**
 * Funlções que podem ser executadas pelo Mustache na hora de ler o commands (Executa a função e retorna valor ou não)
 * @param args todos os argumentos recolhidos durante a execução no comando
 * @returns {object} todos as funções disponíveis para serem utilizadas no template
 */
module.exports = function (args) {
    return {
        count: function () { return count_1.default(args); },
        help: function () { return help_1.default(args); },
        funcaoComandoConsole: function () { console.log("Oie"); }
    };
};
