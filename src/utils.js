const cron = require('node-cron');
const getTemplateChannel = require('./useCases/initTemplates/initTemplates');

/**
 * Esse método busca um comando removendo o ! dentro do arquivo commands.json
 * @param action Comando a ser buscado com ou sem o prefixo (!)
 * @param ignored Lista de comandos a serem ignorados pelo bot
 * @param commands Lista de comandos reconhecidos
 * @returns {{reserved: boolean, find: boolean, command: null}|{reserved: boolean, find: boolean, command}}
 */
const findCommandByAction = (action, ignored, commands) => {
    if (action.startsWith("!")) { action = action.substring(1,action.length); }
    if (ignored.includes(action)) return { find: true, reserved: true, command: null };

    // Iteração para buscar o commando e retornar
    for (const index in commands) {
        if(commands[index].actions?.includes(action)) { return { find: true, reserved: false, command: commands[index] }; }
        else { continue; }
    }

    return { find: false, reserved: false, command: null };
}

/**
 * Este método sanitiza o retorno depois de ter passado pelo render (que chama as funções do useCommands, pois como o
 * comando ajuda para retornar um array dentro das mensagens é necessário salvar como string no render e pós render
 * quebrar as linhas novamente
 * @param find Verifica se o comando foi ou não encontrado
 * @param action O comando que foi solicitado
 * @param username O username de quem requisitou o comando
 * @param rendered O render do commands.json após os useCommands terem sidos acionados caso sejam necessários (json string)
 * @returns {{messages: string[]}|null|command}
 */
const getSanitizedRender = ({ context: { cmd: { find, action } }, twitch: { context: username } }, rendered) => {
    const parsed = JSON.parse(rendered);
    const isExistentCommand = find == true;
    if(!isExistentCommand) return;
    else if(parsed == null) return null;

    // Função que caso a mensagem for string transforma ela em Array separando por \n
    const sanitizeMessagesFromStringToArray = ({ messages }) => {
        if(typeof messages == "string") return messages.split("~break~");
        return messages;
    }

    parsed.messages = sanitizeMessagesFromStringToArray(parsed);
    return parsed;
}

/**
 * Este método inicia mensagens automáticas disparadas por cron, sejam elas a cada minuto ou um dia/hora específica
 * pode se utilizar o site https://crontab.guru para criar as crontabs personalizadas
 * @param channel Nome do canal que será usado como target para as mensagens
 * @param client Client conectado com o IRC da Twitch
 */
const turnOnAutomaticMessages = (channel, client) => {
    // Chamando a função em async
    (async () => {
        // Pega todos os comandos que rodam um determinado tempo configurado pelo cron no template
        const { automatic } = await getTemplateChannel(channel);
        const autoCron = [];

        // Cria um novo schedule com o cron para cada mensagem automática
        await automatic.forEach(({schedule, messages}) => {
            autoCron.push(cron.schedule(schedule, () => {
                messages.forEach(m => client.say(channel, m));
            }));
        });

        // Executa cada uma das mensagens automáticas depois de criadas
        autoCron.forEach(auto => auto.start());
    })()
}

/**
 * Este método concentra os erros na hora de usar um comando, ou executar uma função do partials, ele manda uma
 * mensagem no chat alertando e registra no console o erro gerado com trace!
 * @param client Client conectado com o IRC da Twitch
 * @param target Canal para onde deve ser enviado a mensagem
 * @param username Username do usuário que enviou o comando
 * @param action Comando solicitado pelo @
 * @param error Erro com trace do ocorrido e mensagem
 */
const sendErrorCommand = (client, { twitch: { target, context: { username } }, context: { action } }, error) => {
    // Ternário que pega o usuário do dono do canal para utilizar na mensagem
    const owner = target.startsWith("#") ? target.substring(1, target.length) : target;

    const messages = [
        `/color Coral`,
        `/me Nossa @${username} você me quebrou legal com esse comando aí ${action} .... @${owner} eu deixei um log pra te ajudar a resolver essa bucha aí se vira!`
    ];

    messages.forEach(message => client.say(target, message));
    console.error(error);
}


module.exports = {
    findCommandByAction,
    getTemplateChannel,
    getSanitizedRender,
    sendErrorCommand,
    turnOnAutomaticMessages
}