const cron = require('node-cron')
const getTemplateChannel = require('./useCases/initTemplates/initTemplates')

const getCommandByAction = (action, ignored, commands) => {
    if(action.split("")[0] != "!") { action = "!".concat(action) }
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

    if (cmd.actions.includes("!ajuda")) {
        let splitted = parsed.messages.split("|,")
        parsed.messages = splitted
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