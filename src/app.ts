import express from 'express';
import tmi from 'tmi.js';
import handleCommands from './useCases/handleCommands/handleCommands';
import utils from './utils/utils';
import config from './config';

const app = express();
app.get('/', (req, res) => res.send('Thasfin Bot is running'));
app.listen(3000, () => {console.log('⚡️Server is running');
});

const client = new tmi.client(config);
client.on('message', handleCommands(client));

function handleConnected(address: any, port: any) {
  console.log(`*** Bot conectado com sucesso no IRC (${address}:${port}} nos canais [${config.channels}]`);
  config.channels?.forEach(channel => {
    //TODO refactor this
    utils.turnOnAutomaticMessages(channel, client);

    //TODO: So rodar o startup quando o streamer acaba de abrir live, se a live 
    // está rolando a mais de 10 minutos ou algo assim esse startup não joga o texto no chat
    const startup = [
      "/color yellowgreen",
      // "/me A Thasfin tá na área HeyGuys"
    ];

    startup.forEach((msg : any) => client.say(channel, msg));
  })
}

client.on('connected', handleConnected);
client.connect();
