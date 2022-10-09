import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types";
import { readdirSync } from "fs";
import { join } from "path";
import { BaseCommand } from "src/common/command";
import DiscordFactory from "src/common/core";

export class CommandUtil {
  private client: DiscordFactory;
  private restClient: REST;

  constructor(client: DiscordFactory) {
    this.client = client;
    this.restClient = new REST({ version: "10" }).setToken(process.env.TOKEN);
  }

  public async loadCommands(): Promise<void> {
    this.client.logger.log("Start Loading Commands....");

    const startTIme = performance.now();

    const commandsPath = join(__dirname, "commands");
    const commandFiles = readdirSync(commandsPath).filter((file) =>
      file.endsWith(".ts")
    );

    for (const file of commandFiles) {
      this.client.logger.log(`${file} Loading Starts`);

      const filePath = join(commandsPath, file);
      const command: BaseCommand = await import(filePath);

      this.client.commands.push(command.data.toJSON());
      this.client.commandList.set(command.data.name, command.data.toJSON());

      this.client.logger.log(`${file} added successfully`);
    }

    this.client.logger.log("All Commands Added");

    const endTime = performance.now();

    this.client.logger.log(`Loading Commands Done in ${endTime - startTIme}ms`);
  }

  public async patchCommands(commandList: any[]) {
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
      this.client.logger.error(error);
    }

    const endTime = performance.now();

    this.client.logger.log(
      `Successfully done adding application (/) commands in ${
        endTime - startTIme
      }ms`
    );
  }
}
