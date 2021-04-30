import tmi from 'tmi.js';
import handleCommands from './useCases/handleCommands/handleCommands';
import utils from './utils/utils';
import config from './config';

function handleConnected(address: any, port: any) {
  console.log(`*** Bot conectado com sucesso no IRC (${address}:${port}} nos canais [${options.channels}]`);
  config.channels?.forEach(channel => {
    //TODO refactor this
    utils.turnOnAutomaticMessages(channel, this);

    const startup = [
      "/color yellowgreen",
      "/me A Thasfin tá na área HeyGuys"
    ];

    startup.forEach((msg : any) => this.say(channel, msg));
  })
}

const client = new tmi.client(config);

client.on('message', handleCommands(client));
client.on('connected', handleConnected);

client.connect();
