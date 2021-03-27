require('dotenv').config();
const tmi = require('tmi.js');
const commands = require('./commands');

const options = require('./config');

function handleMessage(target, context, receivedMessage, isBot) {
  const message = receivedMessage.trim();

  if (isBot) return;

  if( message === '!cmds'){
    const sendMessage = commands.reduce((accumulator, command) => { 
      return accumulator + ` ${command.name}`; 
    }, '');
    client.say(target, `${sendMessage} `);
    return;
  }

  const command = commands.find(c => c.name === message);
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
