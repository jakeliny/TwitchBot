import { Options } from 'tmi.js';

const config : Options = {
  identity: {
    username: process.env.USER,
    password: process.env.TOKEN,
  },
  channels: ['jakeliny', 'maykbrito', 'rahmaidev']
  };

export default config;