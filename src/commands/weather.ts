import fetch from "node-fetch";
import { TextChannel } from "discord.js";
import * as city from "./city.list.json";

export class Weather {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  location: string | undefined;

  constructor() {
    this.data = JSON.parse(JSON.stringify(city));
    this.location = undefined;
  }
  public async execute(channel: TextChannel): Promise<void> {
    if (this.location !== undefined)
      (await fetch(this.location)).json().then((data) => {
        channel.send(JSON.parse(JSON.stringify(data)).main.temp + "°C");
      });
    else
      channel.send(
        "(Error) !weather: No location has been specified. Please use the '!setLocation' command."
      );
    return;
  }
  public setLocation(
    city: string | undefined,
    channel: TextChannel | undefined
  ): void {
    if (city === undefined || channel === undefined) return;
    const entry = this.getLocation(city);
    if (entry !== undefined)
      this.location =
        "https://api.openweathermap.org/data/2.5/weather?id=" +
        entry +
        "&appid=" +
        process.env.OPEN_WEATHER +
        "&units=metric";
    else channel.send("(Error) !setLocation: Unknown Location.");
  }
  private getLocation(city: string): string | undefined {
    for (const entry in this.data)
      if (this.data[entry].name === city) return this.data[entry].id;
    return undefined;
  }
}
