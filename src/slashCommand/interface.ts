import { CommandInteraction, SlashCommandBuilder } from "discord.js";

export default interface SlashCommandInterface {
  command: SlashCommandBuilder;
  exec(interaction: CommandInteraction): Promise<void>;
}
