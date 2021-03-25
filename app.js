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

function mensagemChegou(alvo, context, mensagem, isBot) {
    if (isBot) {
      return; 
    } 

  const command = mensagem.trim();
  commands.map( commands => {
    if(commands.name == command){
        client.say(alvo, "@" + context.username + " " + commands.description);
    }
  });  
}
  
  function entrouNoChatDaTwitch(endereco, porta) {
    console.log(`* Bot entrou no endereço ${endereco}:${porta}`);
  }


const client = new tmi.client(opts);
client.on('message', mensagemChegou);
client.on('connected', entrouNoChatDaTwitch);
client.connect();