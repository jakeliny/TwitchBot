//TODO: refatorar os imports para cada função
import getTemplateChannel from '../useCases/initTemplates/initTemplates';
import findCommandByAction from './findCommandByAction';
import getSanitizedRender from './getSanitizedRender';
import sendErrorCommand from './sendErrorCommand';
import turnOnAutomaticMessages from './turnOnAutomaticMessages';

export default  {
    findCommandByAction,
    getTemplateChannel,
    getSanitizedRender,
    sendErrorCommand,
    turnOnAutomaticMessages
}