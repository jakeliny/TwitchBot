"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var tmi_js_1 = __importDefault(require("tmi.js"));
var handleCommands_1 = __importDefault(require("./useCases/handleCommands/handleCommands"));
var utils_1 = __importDefault(require("./utils/utils"));
var config_1 = __importDefault(require("./config"));
var app = express_1.default();
app.get('/', function (req, res) { return res.send('Thasfin Bot is running'); });
app.listen(3000, function () {
    console.log('⚡️Server is running');
});
var client = new tmi_js_1.default.client(config_1.default);
client.on('message', handleCommands_1.default(client));
function handleConnected(address, port) {
    var _a;
    console.log("*** Bot conectado com sucesso no IRC (" + address + ":" + port + "} nos canais [" + config_1.default.channels + "]");
    (_a = config_1.default.channels) === null || _a === void 0 ? void 0 : _a.forEach(function (channel) {
        //TODO refactor this
        utils_1.default.turnOnAutomaticMessages(channel, client);
        //TODO: So rodar o startup quando o streamer acaba de abrir live, se a live 
        // está rolando a mais de 10 minutos ou algo assim esse startup não joga o texto no chat
        var startup = [
            "/color yellowgreen",
            // "/me A Thasfin tá na área HeyGuys"
        ];
        startup.forEach(function (msg) { return client.say(channel, msg); });
    });
}
client.on('connected', handleConnected);
client.connect();
