require('dotenv').config();
const tmi = require('tmi.js');
const handleOpenCommands = require('./useCases/openCommands')

const options = require('./config');

function handleConnected(address, port) {
  console.log(`* Bot entrou no endereço ${address}:${port}`);
}

const client = new tmi.client(options);

client.on('message', handleOpenCommands(client));
client.on('connected', handleConnected);

client.connect();
