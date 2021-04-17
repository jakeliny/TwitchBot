const commands = require('../commands/open');
const openCommands = require('./openCommands.js');

const mockClient = {
	say(target, message) {
		return `${target}: ${message}`;
	},
};

describe('Open Commands Use Case', () => {
	it('should to be able list all commands', () => {
		const result = openCommands(mockClient)(
			'botName',
			{ username: 'viewerName' },
			'!help',
			false,
		);

		commands.forEach((command) =>
			expect(result.includes(command.name)).toBe(true),
		);
	});

	it('must return command messages', () => {
		const command = commands.map((command) => [command.name, command.message]);

		command.forEach(([command, message]) => {
			const result = openCommands(mockClient)(
				'botName',
				{ username: 'viewerName' },
				command,
				false,
			);
			expect(result).toContain(message);
		});
	});

	it('should not be possible to call a command if it is a bot', () => {
		const result = openCommands(mockClient)(
			'botName',
			{ username: 'viewerName' },
			'!help',
			true,
		);
		expect(result).not.toBeDefined();
	});
});
