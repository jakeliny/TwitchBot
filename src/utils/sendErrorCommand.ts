
/**
 * Este método concentra os erros na hora de usar um comando, ou executar uma função do partials, ele manda uma
 * mensagem no chat alertando e registra no console o erro gerado com trace!
 * @param client Client conectado com o IRC da Twitch
 * @param target Canal para onde deve ser enviado a mensagem
 * @param username Username do usuário que enviou o comando
 * @param action Comando solicitado pelo @
 * @param error Erro com trace do ocorrido e mensagem
 */
 const sendErrorCommand = (client: any, { twitch: { target, context: { username } }, context: { action } }, error) => {
    // Ternário que pega o usuário do dono do canal para utilizar na mensagem
    const owner = target.startsWith("#") ? target.substring(1, target.length) : target;

    const messages = [
        `/color Coral`,
        `/me Nossa @${username} você me quebrou legal com esse comando aí ${action} .... @${owner} eu deixei um log pra te ajudar a resolver essa bucha aí se vira!`
    ];

    messages.forEach(message => client.say(target, message));
    console.error(error);
}

export default sendErrorCommand