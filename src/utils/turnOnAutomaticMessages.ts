const cron = require('node-cron');

/**
 * Este método inicia mensagens automáticas disparadas por cron, sejam elas a cada minuto ou um dia/hora específica
 * pode se utilizar o site https://crontab.guru para criar as crontabs personalizadas
 * @param channel Nome do canal que será usado como target para as mensagens
 * @param client Client conectado com o IRC da Twitch
 */
 const turnOnAutomaticMessages = (channel: any, client: any) => {
    // Chamando a função em async
    (async () => {
        // Pega todos os comandos que rodam um determinado tempo configurado pelo cron no template
        const { automatic } = await getTemplateChannel(channel);
        const autoCron: any = [];

        // Cria um novo schedule com o cron para cada mensagem automática
        await automatic.forEach((
            {schedule, messages}: 
            {schedule: any, messages: any}
        ) => {
            autoCron.push(cron.schedule(schedule, () => {
                messages.forEach((message: any) => client.say(channel, message));
            }));
        });

        // Executa cada uma das mensagens automáticas depois de criadas
        autoCron.forEach((auto: any) => auto.start());
    })()
}

export default turnOnAutomaticMessages