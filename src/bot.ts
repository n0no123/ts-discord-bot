import Discord from "discord.js";
import { Weather } from "./commands/weather";
import { CronJob } from "cron";

const client = new Discord.Client();

client.once("ready", () => {
  console.log("Logged In!");
});

export class Bot {
  cronJob: CronJob;
  constructor() {
    this.cronJob = new CronJob("30 7 * * *", async () => {
      try {
        await this.weather();
      } catch (e) {
        console.error(e);
      }
    });
    if (!this.cronJob.running) {
      this.cronJob.start();
    }
  }

  private async weather(): Promise<void> {
    Weather.execute(
      client.channels.cache.get("857235937032536107") as Discord.TextChannel
    );
  }

  public listen(): Promise<string> {
    client.on("message", (message: Discord.Message) => {
      console.log(message.channel.id);
    });
    client.on("message", async (message: Discord.Message) => {
      switch (message.content) {
        case "!weather": {
          Weather.execute(message.channel as Discord.TextChannel);
          break;
        }
      }
    });
    return client.login(process.env.BOT_TOKEN);
  }
}
