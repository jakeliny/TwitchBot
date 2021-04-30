import commands from '../commands/open';

const openCommands = (client : any) => (
  target: any, 
  context: any, 
  receivedMessage: any, 
  isBot: any
  ) => {
  const message = receivedMessage.trim();

  if (isBot) return;

  if( message === '!help'){
    const sendMessage = commands.reduce((acc: any, command: any) => { 
      return acc + ` ${command.name}`; 
    }, '');
    return client.say(target, `${sendMessage} `);
    
  }

  const command : any = commands.find((command: any) => command.name === message);
  if (!command) return 'Error';

  return client.say(target, `@${context.username} ${command.message}`);
  
}

export default openCommands