import { Message } from "discord.js";

export class Nyeh {
  static execute(message: Message): void {
    message.channel.send("nyeh?");
  }
}
