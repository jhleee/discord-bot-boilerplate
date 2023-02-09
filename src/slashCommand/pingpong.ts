import { SlashCommandBuilder, CacheType, CommandInteraction } from "discord.js";
import SlashCommandInterface from "./interface";

export default class PingPong implements SlashCommandInterface {
  name = "pingpong";
  command = new SlashCommandBuilder()
    .setName("pingpong")
    .addStringOption((option) =>
      option.setName("option").setDescription("Sample Option"),
    )
    .setDescription("Ping- Pong- !");
  async exec(interaction: CommandInteraction<CacheType>) {
    await interaction.deferReply();
    let opt = interaction.options.get("option", false)?.value;
    await interaction.editReply({
      content: "Pong : option=" + opt,
    });
  }
}
