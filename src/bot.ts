import { Client, Message } from "discord.js";

export class Bot {
  public listen(): Promise<string> {
    const client = new Client();
    client.on("message", (message: Message) => {
      console.log(message.content);
    });
    return client.login(process.env.TOKEN);
  }
}
