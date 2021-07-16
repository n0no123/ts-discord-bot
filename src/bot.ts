import Discord from "discord.js";
import { Nyeh } from "./commands/nyeh";
import { Ping } from "./commands/ping";
import { Quack } from "./commands/quack";
import { Weather } from "./commands/weather";

const client = new Discord.Client();

client.once("ready", () => {
  console.log("Logged In!");
});

export class Bot {
  public listen(): Promise<string> {
    client.on("message", (message: Discord.Message) => {
      console.log(message.content);
    });
    client.on("message", async (message: Discord.Message) => {
      switch (message.content) {
        case "!nyeh": {
          Nyeh.execute(message);
          break;
        }
        case "!ping": {
          Ping.execute(message);
          break;
        }
        case "!quack": {
          Quack.execute(message);
          break;
        }
        case "!weather": {
          console.log(JSON.parse(await Weather.test()));
          break;
        }
      }
    });
    return client.login(process.env.BOT_TOKEN);
  }
}
