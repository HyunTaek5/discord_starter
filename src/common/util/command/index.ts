import { REST } from "@discordjs/rest";
import { readdirSync } from "fs";
import { join } from "path";
import { Command } from "./type";
import DiscordFactory from "src/common/core";

export class CommandUtil {
  private client: DiscordFactory;
  private restClient: REST;

  constructor(client: DiscordFactory) {
    this.client = client;
    this.restClient = new REST({ version: "9" }).setToken(process.env.TOKEN);
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

  public async patchCommands(commandList: Command[]) {
    this.client.logger.log("Start adding application (/) commands.");
    const startTIme = performance.now();
    try {
      await this.restClient.put(
        Routes.applicationGuildCommands(
          process.env.CLIENT_ID,
          process.env.GUILD_ID
        ),
        { body: commandList }
      );
    } catch (error) {
      console.error(error);
    }

    const endTime = performance.now();

    this.client.logger.log(
      `Successfully done adding application (/) commands in ${
        endTime - startTIme
      }ms`
    );
  }
}
