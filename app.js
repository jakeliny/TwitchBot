require('dotenv').config();
const tmi = require('tmi.js');

const opts = {
    identity: {
    username: 'thasfinbot',
    password: process.env.TOKEN,
    },
    channels: [ 'jakeliny' ]
};

function mensagemChegou(alvo, contexto, mensagem, isBot) {
    if (isBot) {
      return; 
    } 

  const nomeDoComando = mensagem.trim();
    if (nomeDoComando === '!discord') {
        client.say(alvo, `Entra no discod da devHouse!! https://discord.gg/ubP6kkyttY`);
    } else {
    return;
    }
  }
  
  function entrouNoChatDaTwitch(endereco, porta) {
    console.log(`* Bot entrou no endereço ${endereco}:${porta}`);
  }


const client = new tmi.client(opts);
client.on('message', mensagemChegou);
client.on('connected', entrouNoChatDaTwitch);
client.connect();