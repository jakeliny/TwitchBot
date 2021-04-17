const { EventSubListener } = require('twitch-eventsub');

import { ApiClient } from 'twitch';
import { ClientCredentialsAuthProvider } from 'twitch-auth';
import { DirectConnectionAdapter, EventSubListener } from 'twitch-eventsub';

const clientId = 'YOUR_CLIENT_ID';
const clientSecret = 'YOUR_CLIENT_SECRET';

const authProvider = new ClientCredentialsAuthProvider(clientId, clientSecret);
const apiClient = new ApiClient({ authProvider });

const listener = new EventSubListener(
	apiClient,
	new DirectConnectionAdapter({
		hostName: 'example.com',
		sslCert: {
			key: 'aaaaaaaaaaaaaaa',
			cert: 'bbbbbbbbbbbbbbb',
		},
	}),
	'thisShouldBeARandomlyGeneratedFixedString',
);
await listener.listen();

require('dotenv').config();
const tmi = require('tmi.js');
const handleOpenCommands = require('./useCases/openCommands');

const options = require('./config');

function handleConnected(address, port) {
	console.log(`* Bot entrou no endereço ${address}:${port}`);
}

const client = new tmi.client(options);

client.on('message', handleOpenCommands(client));
client.on('connected', handleConnected);

client.connect();
