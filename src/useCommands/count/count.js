const database = require("../../database");
const MAX_INCREMENT = 10;

/**
 * Esta método pega a requisição e retorna um valor entre 1 e MAX_INCREMENT parseado da requisição
 * @param req Array com a requisição do comando, o que foi digitado após ele separado por espaços
 * @returns {number} Entre 0 e MAX_INCREMENT
 */
const getIncrementValueReq = (req) => {
    if(!req.length) return 1;
    const increment = parseInt(req) || 1;
    if(increment < MAX_INCREMENT) return increment;
    return 1;
}

/**
 * Este método atualiza o db e retorna o dado salvo do count
 * @param key Chave salva no db para o count
 * @param value Valor para ser incrementado
 * @returns {number} Valor salvo no db
 */
const getIncrementValueDatabase = async(key, value) => {
    // Busca o valor atual na database caso não tenha cria um objeto inicial
    const saved = await database.get("counts").find({ key }).value() || { key, value: 0 };

    // Incrementa o valor em database/inicial com o valor de incremento
    saved.value += value

    // Remove o estado atual (JSON Db - se salvar de novo sem apagar cria outro objeto)
    await database.get('counts').remove({ key }).write()

    // Salva no banco o novo valor de counts e retorna esse valor
    await database.get("counts").push(saved).write()
    return saved.value;
}

/**
 * Método que ao ser executado pega o id da action e dá um count de quantas vezes foi chamado, retornando o valor
 * @param command Comando solicitado para count
 * @param req Requisição do comando, caso venha vazio nada foi passado após o comando (é um array)
 * @returns {number} Valor salvo no db
 */
module.exports = async ({ context: { cmd: { command }, req } }) => {
    // Pega o nome da primeira action do comando pra definir como key no db
    const action = command.actions[0];
    const key_db = `count_${action}`;

    // Pega o valor passado na chamada ou define o valor como 1 caso não tenha valor ou utrapasse o MAX_INCREMENT
    const increment = getIncrementValueReq(req);
    const count = await getIncrementValueDatabase(key_db, increment);

    // Retorna o valor atual incrementado no banco
    return count;
}