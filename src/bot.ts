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
      switch (message.content) {
        case "!setChannel": {
          this.jobChannelId = message.channel.id;
          break;
        }
        case "!hourly": {
          this.weather.hourly(
            message.channel as Discord.TextChannel,
            message.createdAt.getHours()
          );
          break;
        }
        case "!setLocation": {
          const filter = (m: { author: { id: string } }) =>
            m.author.id === message.author.id;
          message.channel.send("Please enter a location:").then(() => {
            message.channel
              .awaitMessages(filter, {
                max: 1,
                time: 30000,
                errors: ["time"],
              })
              .then((message) => {
                this.weather.setLocation(
                  message?.first()?.content,
                  message?.first()?.channel as Discord.TextChannel
                );
              })
              .catch(() => {
                message.channel.send("(Error) !setLocation: Timeout.");
              });
          });
        }
      }
    });
    return this.client.login(process.env.BOT_TOKEN);
  }
}
