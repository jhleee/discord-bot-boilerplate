import { SlashCommandBuilder } from "@discordjs/builders";
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v10";
import * as Discord from "discord.js";
import SlashCommandInterface from "./slashCommand/interface";
import * as _ from "lodash";

let _token = process.env.BOT_TOKEN || "";
let _applicationId = process.env.APPLICATION_ID || "";

let commandMap: Map<string, SlashCommandInterface> = new Map();

const client = new Discord.Client({
  intents: [
    Discord.IntentsBitField.Flags.GuildMessages,
    Discord.IntentsBitField.Flags.MessageContent,
    Discord.IntentsBitField.Flags.GuildMessageTyping,
    Discord.IntentsBitField.Flags.GuildMembers,
  ],
});

async function registryCommand(cmds: Array<SlashCommandBuilder>) {
  // add command using REST API
  const rest = new REST({ version: "10" }).setToken(_token);
  const data = await rest.put(Routes.applicationCommands(_applicationId), {
    body: cmds,
  });
}

client.once("ready", async (e) => {
  // establish connection
  console.log("█ Server Ready\n");
  client.guilds.fetch().then((guild) => {
    console.log("█ Guild List");
    guild.forEach((g) => {
      console.log(`${g.name} = ${g.id}`);
    });
  });

  // slash command
  console.log("█ Registry Command ..");
  const commandBuilders: Array<SlashCommandBuilder> = [];

  commandMap.forEach((command) => {
    console.log(` - ${command.command.name}`);
     commandBuilders.push(command.command);
  })
  await registryCommand(commandBuilders);

  console.log("█ Done !\n");
});

client.on(
  Discord.Events.InteractionCreate,
  async (interaction: Discord.Interaction) => {
    if (!interaction.isChatInputCommand()) return;

    await commandMap.get(interaction.commandName)?.exec(interaction);
  },
);

export function addSlashCommand(command: SlashCommandInterface) {
  commandMap.set(command.command.name, command);
}

export function login(applicationId: string, token: string) {
  _applicationId = applicationId;
  _token = token;
  client.login(token);
}
