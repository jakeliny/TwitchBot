/**
 * Esse método busca um comando removendo o ! dentro do arquivo commands.json
 * @param action Comando a ser buscado com ou sem o prefixo (!)
 * @param ignored Lista de comandos a serem ignorados pelo bot
 * @param commands Lista de comandos reconhecidos
 * @returns {{reserved: boolean, find: boolean, command: null}|{reserved: boolean, find: boolean, command}}
 */
const findCommandByAction = (action: any, ignored: any, commands: any) => {
    if (action.startsWith("!")) { action = action.substring(1,action.length); }
    if (ignored.includes(action)) return { find: true, reserved: true, command: null };

    // Iteração para buscar o commando e retornar
    for (const index in commands) {
        if(commands[index].actions?.includes(action)) { return { find: true, reserved: false, command: commands[index] }; }
        else { continue; }
    }

    return { find: false, reserved: false, command: null };
}

export default findCommandByAction