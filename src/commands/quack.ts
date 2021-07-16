import { Message } from "discord.js";

export class Quack {
  static execute(message: Message): void {
    message.channel.send("quack", { tts: true });
  }
}
