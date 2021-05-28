import utils  from '../../utils/utils';
import getTemplateChannel from '../../useCases/initTemplates/initTemplates';

/**
 * Método que trata todos os recebimentos de mensagens e processa comandos
 * @param client Client IRC da Twitch conectado com canal
 * @returns {(function(*=, *, *, *=): Promise<void>)|*} Função para tratamento das mensagens
 */
const handleCommands = (client: any) => async (target: any, context: any, receivedMessage: any, isBot: any) => {
  // Varifica se quem mandou a mensagem não é bot e se a mensagem é um comando aceitável
  if (isBot) return;
  if (!receivedMessage.startsWith("!")) return;

  // Inicializa as constantes para processo de tratamento do comando (action)
  const req = receivedMessage.split(" ");
  const action = req.shift();
  const template = await getTemplateChannel(target);
  const ignored = template["ignored-commands"];
  const commands = template["commands"];

  // Busca o comando no template do canal e define os argumentos e contexto para uso no comando
  const cmd = utils.findCommandByAction(action, ignored, commands);
  const args = {
    twitch: { target, context, receivedMessage, isBot },
    context: { cmd, action, req, commands, ignored, template }
  };

  // Try / Catch para processamento do comando solicitado
  try {
    // Partials se refe aos useCommands que podem ser chamados a partir
    const partials = await require('../../useCommands')(args);
    const rendered = await JSON.stringify(cmd.command);
    const parsed = utils.getSanitizedRender(args, rendered);
    const shouldPrintMessages = parsed != null && Array.isArray(parsed.messages);

    if (shouldPrintMessages) parsed["messages"].forEach((message: any) => client.say(target, message));
  }
  catch (e) { utils.sendErrorCommand(client, args, e); }
}

export default handleCommands