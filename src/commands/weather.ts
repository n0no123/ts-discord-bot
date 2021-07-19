import fetch from "node-fetch";
import { TextChannel } from "discord.js";
import * as city from "./city.list.json";

let location: string | undefined = undefined;

const data = JSON.parse(JSON.stringify(city));

export class Weather {
  static async execute(channel: TextChannel): Promise<void> {
    if (location !== undefined)
      (await fetch(location)).json().then((data) => {
        channel.send(JSON.parse(JSON.stringify(data)).main.temp + "°C");
      });
    return;
  }
  static getLocation(city: string): string | undefined {
    for (const entry in data)
      if (data[entry].name === city) return data[entry].id;
    return undefined;
  }
  static setLocation(city: string): void {
    const entry = Weather.getLocation(city);
    if (entry !== undefined)
      location =
        "https://api.openweathermap.org/data/2.5/weather?id=" +
        entry +
        "&appid=" +
        process.env.OPEN_WEATHER +
        "&units=metric";
  }
}
