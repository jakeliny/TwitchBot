const cron = require('node-cron')
const getTemplateChannel = require('./useCases/initTemplates/initTemplates')

const getCommandByAction = (action, ignored, commands) => {
    if(action.split("")[0] == "!") { action = action.substring(1,action.length); }
    if (ignored.includes(action)) return null;

    let result = commands.map(command => {
        let { actions } = command;
        if(actions.includes(action)) { return command }
        else { return null }
    })

    result = result.filter(res => res != null);

    if (result.length > 0) { return result[0] }
    return result;
}

const getSanitizedRender = ({ context: { cmd } }, rendered) => {
    let parsed = JSON.parse(rendered)

    if (Array.isArray(cmd) && cmd.length > 0) {
        if (cmd.actions.includes("ajuda")) {
            let splitted = parsed.messages.split("|,")
            parsed.messages = splitted
        }
    }

    if (Array.isArray(cmd) && cmd.length == 0) {
        return {
            messages: [
                "/color Firebrick",
                "/me Ops acho que não existe esse comando ai não hein Keepo"
            ]
        }
    }

    return parsed;
}

const turnOnAutomaticMessages = (channel, client) => {
    // Hack para funcionar async em funções principais onde não é aceito o async
    (async () => {
        let { automatic } = await getTemplateChannel(channel);
        let autoCron = []

        await automatic.forEach(({schedule, messages}) => {
            autoCron.push(cron.schedule(schedule, () => {
                messages.forEach(m => client.say(channel, m))
            }))
        })

        autoCron.forEach(auto => auto.start());
    })()
}

module.exports = {
    getCommandByAction,
    getTemplateChannel,
    getSanitizedRender,
    turnOnAutomaticMessages
}