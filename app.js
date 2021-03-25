const tmi = require('tmi.js');
const token = ''

const opts = {
    identity: {
    username: 'Thasfin',
    password: token,
    },
    channels: [ 'jakeliny' ]
};

function mensagemChegou(alvo, contexto, mensagem, isBot) {
    if (isBot) {
      return; 
    } 
  
    /* Objetivo colocar o nome do bot na mensagem*/
  const nomeDoComando = mensagem.trim();
    if (nomeDoComando === '!discord') {
        client.say(opts.username, `Entra no discod da devHouse!! https://discord.gg/ubP6kkyttY`);
    } else {
    return;
    }
  }
  
  function entrouNoChatDaTwitch(endereco, porta) {
    console.log(`* Bot entrou no endereço ${endereco}:${porta}`);
  }

// Cria um cliente tmi com  nossas opções
const client = new tmi.client(opts);

// Registra nossas funções
client.on('message', mensagemChegou);
client.on('connected', entrouNoChatDaTwitch);
// Connecta na Twitch:
client.connect();