module.exports = {
    identity: {
      username: 'thasfinbot',
      password: process.env.TOKEN,
    },
    channels: ['mechamogeo'],
    startup: [
        "/color yellowgreen",
        "/me A Thasfin tá na área HeyGuys"
    ],
  };