import { SlashCommandBuilder } from "@discordjs/builders";
import { InteractionType } from "./type";

export class BaseCommand {
  public data: SlashCommandBuilder;
  public replyData: any;

  constructor(name: string, description: string) {
    this.data = new SlashCommandBuilder()
      .setName(name)
      .setDescription(description);
  }

  async setReplyData(replyData: any) {
    this.replyData = replyData;
  }

  async execute(interaction: InteractionType) {
    await interaction.reply(this.replyData);
  }
}
