require('dotenv').config();
const tmi = require('tmi.js');
const handleCommands = require('./useCases/handleCommands/handleCommands')

const utils = require('./utils');
const options = require('./config');

function handleConnected(address, port) {
  console.log(`*** Bot conectado com sucesso no IRC (${address}:${port}} nos canais [${options.channels}]`);

  options.channels.forEach(channel => {
    utils.turnOnAutomaticMessages(channel, this);
    options.startup.forEach(m => this.say(channel, m));
  })
}

const client = new tmi.client(options);

client.on('message', handleCommands(client));
client.on('connected', handleConnected);

client.connect();
