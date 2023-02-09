import dotenv from "dotenv";
import * as discordServer from "./src/server";
import PingPong from "./src/slashCommand/pingpong";

// import .env
dotenv.config();

if (process.env.APPLICATION_ID === undefined) {
  throw new Error("Please provide a valid application ID");
}
if (process.env.BOT_TOKEN === undefined) {
  throw new Error("Please provide a valid bot token");
}

discordServer.addSlashCommand(new PingPong());

discordServer.login(process.env.APPLICATION_ID, process.env.BOT_TOKEN);
