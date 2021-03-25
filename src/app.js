require('dotenv').config();
const tmi = require('tmi.js');
const commands = require('./commands');

const options = {
  identity: {
    username: 'thasfinbot',
    password: process.env.TOKEN,
  },
  channels: ['jakeliny', 'maykbrito'],
};

function handleMessage(target, context, message, isBot) {
  if (isBot) return;

  const command = commands.find((c) => c.name === message.trim());
  if (!command) return;

  client.say(target, `@${context.username} ${command.message}`);
}

function handleConnected(address, port) {
  console.log(`* Bot entrou no endereço ${address}:${port}`);
}

const client = new tmi.client(options);

client.on('message', handleMessage);
client.on('connected', handleConnected);

client.connect();
