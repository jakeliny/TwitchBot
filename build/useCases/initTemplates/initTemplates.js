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
//TODO ver o que é LRU
var lru_cache_1 = __importDefault(require("lru-cache"));
var path_1 = __importDefault(require("path"));
var fs_1 = require("fs");
var cache = new lru_cache_1.default({ maxAge: 500 * 60 * 60 });
/**
 * Método que retorna o template a ser utilizado pelo canal pegando o valor ou cache (cache de 1/2h)
 * @param channel canal de onde o bot será executado
 * @returns {object|null} Retorna o template do canal ou o template padrão do bot
 */
var getTemplateChannel = function (channel) {
    if (channel === void 0) { channel = ""; }
    return __awaiter(void 0, void 0, void 0, function () {
        var owner, _a, channelCommands, commonCommands;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    owner = channel.substring(1, channel.length);
                    // Retorna o valor em cache do template caso já tenha sido salvo anteriormente
                    if (cache.get("commands." + owner + ".json")) {
                        return [2 /*return*/, JSON.parse("" + cache.get("commands." + owner + ".json"))];
                    }
                    return [4 /*yield*/, Promise.all([
                            // promises.readFile(path.resolve(`commands.${owner}.json`), "UTF-8").catch(() => null),
                            // promises.readFile(path.resolve(`commands.json`), "UTF-8").catch(() => null),
                            fs_1.promises.readFile(path_1.default.resolve("commands." + owner + ".json")).catch(function () { return null; }),
                            fs_1.promises.readFile(path_1.default.resolve("commands.json")).catch(function () { return null; }),
                        ])
                        //TODO ver esse buffer do channelCommands
                        // Se encontrar o template do canal, prioriza o retorno e salva no cache
                    ];
                case 1:
                    _a = _b.sent(), channelCommands = _a[0], commonCommands = _a[1];
                    //TODO ver esse buffer do channelCommands
                    // Se encontrar o template do canal, prioriza o retorno e salva no cache
                    if (channelCommands != null) {
                        cache.set("commands." + owner + ".json", channelCommands);
                        return [2 /*return*/, JSON.parse("" + channelCommands)];
                    }
                    // Salva para esse canal o template de comandos default e retorna ele
                    cache.set("commands." + owner + ".json", commonCommands);
                    return [2 /*return*/, JSON.parse("" + commonCommands)];
            }
        });
    });
};
exports.default = getTemplateChannel;
