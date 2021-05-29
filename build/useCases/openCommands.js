"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var open_1 = __importDefault(require("../commands/open"));
var openCommands = function (client) { return function (target, context, receivedMessage, isBot) {
    var message = receivedMessage.trim();
    if (isBot)
        return;
    if (message === '!help') {
        var sendMessage = open_1.default.reduce(function (acc, command) {
            return acc + (" " + command.name);
        }, '');
        return client.say(target, sendMessage + " ");
    }
    var command = open_1.default.find(function (command) { return command.name === message; });
    if (!command)
        return 'Error';
    return client.say(target, "@" + context.username + " " + command.message);
}; };
exports.default = openCommands;
