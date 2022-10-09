import { Client, Collection, PartialTypes } from "discord.js";
import { Logger } from "../logger";
import { Util } from "../util";

export default class DiscordFactory extends Client {
  public logger = new Logger();

  public readonly util: Util;
  public commands = [];
  public commandList = new Collection();

  constructor(intents: any[], partials: PartialTypes[]) {
    super({
      intents,
      partials,
    });
  }

  public async init() {
    this.logger.log("Initializing...");

    await this.util.loadCommands();
    await this.util.patchCommands(this.commands);

    this.logger.log("Initialize Done");

    await this.login(process.env.TOKEN)
      .then(() => this.logger.log("Connected to Discord Server"))
      .catch((err) => this.logger.error(err.message));
  }
}
