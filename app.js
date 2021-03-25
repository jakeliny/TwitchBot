require('dotenv').config();
const tmi = require('tmi.js');

const opts = {
    identity: {
    username: 'thasfinbot',
    password: process.env.TOKEN,
    },
    channels: [ 'jakeliny' ]
};

function messageHasArrived(target, context, message, isBot) {
    if (isBot) {
      return;
    } 

  const commandName = message.trim();
    if (commandName === '!discord') {
        client.say(target, `Entra no discord da devHouse!! https://discord.gg/ubP6kkyttY`);
    } else {
    return;
    }
  }
  
  function joinedTheChatTwitch(address, port) {
    console.log(`* Bot entrou no endereço ${address}:${port}`);
  }


const client = new tmi.client(opts);
client.on('message', messageHasArrived);
client.on('connected', joinedTheChatTwitch);
client.connect();
