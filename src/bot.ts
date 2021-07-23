import Discord from "discord.js";
import { CronJob } from "cron";
import { Weather } from "./commands/weather";

export class Bot {
  client: Discord.Client;
  weather: Weather;
  jobChannelId: string | undefined;
  cronJob: CronJob;

  constructor() {
    this.client = new Discord.Client();
    this.weather = new Weather();
    this.jobChannelId;
    this.cronJob = new CronJob("30 7 * * *", async () => {
      await this.daily();
    });
    if (!this.cronJob.running) {
      this.cronJob.start();
    }
    this.client.once("ready", () => {
      console.log("Logged In!");
    });
  }

  private async daily(): Promise<void> {
    if (this.jobChannelId !== undefined)
      this.weather.hourly(
        this.client.channels.cache.get(
          this.jobChannelId
        ) as Discord.TextChannel,
        7.3
      );
  }

  public listen(): Promise<string> {
    this.client.on("message", async (message: Discord.Message) => {
      const content = message.content.split(" ");
      switch (content[0]) {
        case "!setChannel": {
          if (content.length !== 1)
            message.channel.send("(Error) !setChannel: Invalid Argument.");
          else this.jobChannelId = message.channel.id;
          break;
        }
        case "!setLocation": {
          this.weather.setLocation(
            message.channel as Discord.TextChannel,
            content.slice(1).join(" ")
          );
          break;
        }
        case "!hourly": {
          this.weather.hourly(
            message.channel as Discord.TextChannel,
            message.createdAt.getHours()
          );
          break;
        }
        case "!location": {
          this.weather.getCurrentLocation(
            message.channel as Discord.TextChannel
          );
          break;
        }
      }
    });
    return this.client.login(process.env.BOT_TOKEN);
  }
}
