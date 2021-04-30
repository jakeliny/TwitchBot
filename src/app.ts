import { config as dotenv} from 'dotenv';
dotenv();
import tmi from 'tmi.js';
import OpenCommands from './useCases/openCommands';
import config from './config';


function handleConnected(address: any, port: any) {
  console.log(`* Bot entrou no endereço ${address}:${port}`);
}

const client = new tmi.client(config);

client.on('message', OpenCommands(client));
client.on('connected', handleConnected);

client.connect();
