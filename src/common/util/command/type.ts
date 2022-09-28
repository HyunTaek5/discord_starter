import { Message } from 'discord.js';
import DiscordFactory from 'src/common/core';

export interface CommandArgs {
  client: DiscordFactory;
  message: Message;
}

export interface Command {
  name: string;
  description: string;
  category?: string;
  execute?: (args: CommandArgs) => Promise<unknown | void> | unknown | void;
}
