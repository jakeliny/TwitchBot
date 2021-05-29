"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//TODO: refatorar os imports para cada função
var initTemplates_1 = __importDefault(require("../useCases/initTemplates/initTemplates"));
var findCommandByAction_1 = __importDefault(require("./findCommandByAction"));
var getSanitizedRender_1 = __importDefault(require("./getSanitizedRender"));
var sendErrorCommand_1 = __importDefault(require("./sendErrorCommand"));
var turnOnAutomaticMessages_1 = __importDefault(require("./turnOnAutomaticMessages"));
exports.default = {
    findCommandByAction: findCommandByAction_1.default,
    getTemplateChannel: initTemplates_1.default,
    getSanitizedRender: getSanitizedRender_1.default,
    sendErrorCommand: sendErrorCommand_1.default,
    turnOnAutomaticMessages: turnOnAutomaticMessages_1.default
};
