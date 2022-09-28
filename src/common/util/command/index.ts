import { readdirSync } from "fs";
import { join } from "path";
import DiscordFactory from "src/common/core";
import { Command } from "./type";

export class CommandUtil {
  private client: DiscordFactory;

  constructor(client: DiscordFactory) {
    this.client = client;
  }

  public async loadCommands(): Promise<void> {
    this.client.logger.log("Start Loading Commands....");

    const startTIme = performance.now();

    const categories = readdirSync(join(__dirname, "../..", "commands"));

    categories.map((category) => {
      this.client.logger.log(`Loading command category: ${category}`);

      const commandFiles = readdirSync(
        join(__dirname, "../..", "events/commands", category)
      );

      commandFiles.map(async (commandFile) => {
        this.client.logger.log(`${commandFile} Loading Start`);

        const command: Command = await import(
          join(__dirname, "../..", "commands", category, commandFile)
        );
        command.category = category;

        const commandName: string = command[0];

        this.client.commands.push({
          name: commandName,
          description: command.description,
        });

        this.client.logger.log(`${commandName} added successfully`);
      });

      this.client.logger.log("All Command Added");
    });

    const endTime = performance.now();

    this.client.logger.log(`Loading Commands Done in ${endTime - startTIme}ms`);
  }
}
