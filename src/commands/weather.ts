import fetch from "node-fetch";
import { TextChannel } from "discord.js";

const paris =
  "https://api.openweathermap.org/data/2.5/weather?q=Paris&appid=" +
  process.env.OPEN_WEATHER +
  "&units=metric";

export class Weather {
  static async execute(channel: TextChannel): Promise<void> {
    (await fetch(paris)).json().then((data) => {
      channel.send(JSON.parse(JSON.stringify(data)).main.temp + "°C");
    });
    return;
  }
}
