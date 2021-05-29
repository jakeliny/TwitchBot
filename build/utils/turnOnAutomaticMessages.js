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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var node_cron_1 = __importDefault(require("node-cron"));
var initTemplates_1 = __importDefault(require("../useCases/initTemplates/initTemplates"));
/**
 * Este método inicia mensagens automáticas disparadas por cron, sejam elas a cada minuto ou um dia/hora específica
 * pode se utilizar o site https://crontab.guru para criar as crontabs personalizadas
 * @param channel Nome do canal que será usado como target para as mensagens
 * @param client Client conectado com o IRC da Twitch
 */
var turnOnAutomaticMessages = function (channel, client) {
    // Chamando a função em async
    (function () { return __awaiter(void 0, void 0, void 0, function () {
        var automatic, autoCron;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, initTemplates_1.default(channel)];
                case 1:
                    automatic = (_a.sent()).automatic;
                    autoCron = [];
                    // Cria um novo schedule com o cron para cada mensagem automática
                    return [4 /*yield*/, automatic.forEach(function (_a) {
                            var schedule = _a.schedule, messages = _a.messages;
                            autoCron.push(node_cron_1.default.schedule(schedule, function () {
                                messages.forEach(function (message) { return client.say(channel, message); });
                            }));
                        })];
                case 2:
                    // Cria um novo schedule com o cron para cada mensagem automática
                    _a.sent();
                    // Executa cada uma das mensagens automáticas depois de criadas
                    autoCron.forEach(function (auto) { return auto.start(); });
                    return [2 /*return*/];
            }
        });
    }); })();
};
exports.default = turnOnAutomaticMessages;
