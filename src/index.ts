import { Intents } from "discord.js";
import DiscordFactory from "./common/core";

async function bootStrap() {
  const app = new DiscordFactory(
    [
      Intents.FLAGS.GUILDS,
      Intents.FLAGS.GUILD_MESSAGES,
      Intents.FLAGS.GUILD_INTEGRATIONS,
      Intents.FLAGS.DIRECT_MESSAGES,
    ],
    ["MESSAGE", "CHANNEL"]
  );

  app.init();

  app.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) return;

    const command: any = app.commandList.get(interaction.commandName);

    if (!command) return;

    try {
      await command.execute(interaction);
    } catch (error) {
      app.logger.error(error);
      interaction.reply({
        content: "There is some error while executing command!",
        ephemeral: true,
      });
    }
  });
}

bootStrap();
