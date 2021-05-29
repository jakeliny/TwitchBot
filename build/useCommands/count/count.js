"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var database = require("../../database");
var MAX_INCREMENT = 10;
/**
 * Esta método pega a requisição e retorna um valor entre 1 e MAX_INCREMENT parseado da requisição
 * @param req Array com a requisição do comando, o que foi digitado após ele separado por espaços
 * @returns {number} Entre 0 e MAX_INCREMENT
 */
var getIncrementValueReq = function (req) {
    if (!req.length)
        return 1;
    var increment = parseInt(req) || 1;
    if (increment < MAX_INCREMENT)
        return increment;
    return 1;
};
/**
 * Este método atualiza o db e retorna o dado salvo do count
 * @param key Chave salva no db para o count
 * @param value Valor para ser incrementado
 * @returns {number} Valor salvo no db
 */
var getIncrementValueDatabase = function (key, value) { return __awaiter(void 0, void 0, void 0, function () {
    var saved;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, database.get("counts").find({ key: key }).value()];
            case 1:
                saved = (_a.sent()) || { key: key, value: 0 };
                // Incrementa o valor em database/inicial com o valor de incremento
                saved.value += value;
                // Remove o estado atual (JSON Db - se salvar de novo sem apagar cria outro objeto)
                return [4 /*yield*/, database.get('counts').remove({ key: key }).write()];
            case 2:
                // Remove o estado atual (JSON Db - se salvar de novo sem apagar cria outro objeto)
                _a.sent();
                // Salva no banco o novo valor de counts e retorna esse valor
                return [4 /*yield*/, database.get("counts").push(saved).write()];
            case 3:
                // Salva no banco o novo valor de counts e retorna esse valor
                _a.sent();
                return [2 /*return*/, saved.value];
        }
    });
}); };
/**
 * Método que ao ser executado pega o id da action e dá um count de quantas vezes foi chamado, retornando o valor
 * @param command Comando solicitado para count
 * @param req Requisição do comando, caso venha vazio nada foi passado após o comando (é um array)
 * @returns {number} Valor salvo no db
 */
module.exports = function (_a) {
    var _b = _a.context, command = _b.cmd.command, req = _b.req;
    return __awaiter(void 0, void 0, void 0, function () {
        var action, key_db, increment, count;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    action = command.actions[0];
                    key_db = "count_" + action;
                    increment = getIncrementValueReq(req);
                    return [4 /*yield*/, getIncrementValueDatabase(key_db, increment)];
                case 1:
                    count = _c.sent();
                    // Retorna o valor atual incrementado no banco
                    return [2 /*return*/, count];
            }
        });
    });
};
