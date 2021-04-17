const commands = require('../commands/open');

const openCommands = (client) => (target, context, receivedMessage, isBot) => {
	const message = receivedMessage.trim();

	if (isBot) return;

	if (message === '!help') {
		const sendMessage = commands.reduce((accumulator, command) => {
			return accumulator + ` ${command.name}`;
		}, '');
		return client.say(target, `${sendMessage} `);
	}

	const command = commands.find((c) => c.name === message);
	if (!command) return 'Error';

	return client.say(target, `@${context.username} ${command.message}`);
};

module.exports = openCommands;
