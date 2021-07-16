import { Message } from "discord.js";

export class Ping {
  static execute(message: Message): void {
    message.channel.send("pong");
  }
}
