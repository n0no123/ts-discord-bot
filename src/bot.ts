import Discord from "discord.js";
import { CronJob } from "cron";
import { Weather } from "./commands/weather";

const client = new Discord.Client();

client.once("ready", () => {
  console.log("Logged In!");
});

export class Bot {
  cronJob: CronJob;
  weatherId: string | undefined;

  constructor() {
    this.weatherId = undefined;
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
    if (this.weatherId !== undefined)
      Weather.execute(
        client.channels.cache.get(this.weatherId) as Discord.TextChannel
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
        case "!weather --setup": {
          this.weatherId = message.channel.id;
          break;
        }
      }
    });
    return client.login(process.env.BOT_TOKEN);
  }
}
