const database = require("../../database")
const MAX_COUNT = 10;

module.exports = ({ context: { cmd, req } }) => {
    // Verifica se a chamada tá vindo porque alguém pediu ajuda no comando! (Render do ajuda)
    if (cmd.actions.includes("ajuda")) return

    // Pega o nome da primeira action do comando pra definir como base no db
    const action = cmd.actions[0];
    const key_db = `count_${action}`;

    // Pega o valor passado na chamada ou define o valor como 1
    let increment = req.length != 0 ? parseInt(req.shift()) : 1;

    // Incrementa o valor, se o numero passado for maior que o MAX ele define o incremento como 1
    if (!Number.isNaN(increment)) { if (increment > MAX_COUNT || increment <= 0) increment = 1; }
    if (Number.isNaN(increment)) { increment = 1; }

    // Busca o count no banco de dados caso não exista ele irá criar com o incremento
    let saved = database.get("counts").find({ key: key_db }).value();
    if (!saved) { saved = Object.assign({}, { key: key_db, value: increment }); }
    else {
        database.get('counts').remove({ key: key_db }).write()
        saved.value += increment
    }

    // Salva no banco o novo valor de counts
    database.get("counts").push(saved).write()

    // Retorna o valor atual incrementado
    return saved.value;
}