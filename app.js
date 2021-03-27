require('dotenv').config();
const tmi = require('tmi.js');

const commands = [
    {
        name: '!discord', 
        description: 'Entra no discord da devHouse!! https://discord.gg/ubP6kkyttY'
    },
    {
        name: '!discover', 
        description: 'Se inscreva no discover https://maratonadiscover.rocketseat.com.br/inscricao'
    }
];

const opts = {
    identity: {
    username: 'thasfinbot',
    password: process.env.TOKEN,
    },
    channels: [ 'jakeliny', 'maykbrito' ]
};

function messageHasArrived(target, context, message, isBot) {
    if (isBot) {
      return;
    } 

  const command = message.trim();
  commands.map( commands => {
    if(commands.name == command){
        client.say(target, "@" + context.username + " " + commands.description);
    }
  });  
}
  
  function joinedTwitchChat(address, port) {
    console.log(`* Bot entrou no endereço ${address}:${port}`);
  }


const client = new tmi.client(opts);
client.on('message', messageHasArrived);
client.on('connected', joinedTwitchChat);
client.connect();