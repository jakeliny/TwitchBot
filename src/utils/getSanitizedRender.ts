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
    if(!isExistentCommand) return {messages: ["/color Firebrick", `/me Ops @${username} acho que não existe esse comando ${action} não hein Keepo`]};
    else if(parsed == null) return null;

    // Função que caso a mensagem for string transforma ela em Array separando por \n
    const sanitizeMessagesFromStringToArray = ({ messages }) => {
        if(typeof messages == "string") return messages.split("~break~");
        return messages;
    }

    parsed.messages = sanitizeMessagesFromStringToArray(parsed);
    return parsed;
}

export default getSanitizedRender