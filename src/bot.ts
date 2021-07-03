import Discord from "discord.js";
const client = new Discord.Client();

client.once("ready", () => {
  console.log("Logged In!");
});

export class Bot {
  public listen(): Promise<string> {
    client.on("message", (message: Discord.Message) => {
      console.log(message.content);
    });
    client.on("message", (message) => {
      if (message.content === "!ping") message.channel.send("pong");
      else if (message.content === "!nyeh") message.channel.send("nyeh?");
    });
    return client.login(process.env.TOKEN);
  }
}
