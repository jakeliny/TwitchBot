module.exports = {
    identity: {
      username: 'thasfinbot',
      password: process.env.TOKEN,
    },
    channels: ['jakeliny', 'maykbrito'],
    // TODO: Rodar esse comando apenas se o streamer começou agora, se começou há muito tempo ão rodar esse comando
    startup: [
        // "/color yellowgreen",
        // "A Thasfin tá na área HeyGuys"
    ],
  };