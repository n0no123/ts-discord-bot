import { Client, Message } from "discord.js";

export class Bot {
  public listen(): Promise<string> {
    const client = new Client();
    client.on("message", (message: Message) => {
      console.log(message.content);
    });
    return client.login(
      "ODU3MjM2OTUzNjE1Njk1OTAy.YNMqIA.Ekd8QJyR5QvgXF9EGf834CBxI20"
    );
  }
}
