import fetch from "node-fetch";
import { TextChannel } from "discord.js";
import * as city from "./city.list.json";

export class Weather {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  request: string | undefined;

  constructor() {
    this.data = JSON.parse(JSON.stringify(city));
    this.request = undefined;
  }
  public async execute(channel: TextChannel): Promise<void> {
    if (this.request !== undefined)
      (await fetch(this.request)).json().then((data) => {
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
      this.request =
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
  public async oneCall(channel: TextChannel, hour: number): Promise<void> {
    const request =
      "https://api.openweathermap.org/data/2.5/onecall?lat=2.36073&lon=48.814709&exclude=current,minutely,daily,alerts&units=metric&lang=fr&appid=" +
      process.env.OPEN_WEATHER;
    (await fetch(request)).json().then((data) => {
      for (let it = 0; it < 24; it++)
        if (it >= hour)
          channel.send(
            "Température (" +
              (it < 10 ? "0" : "") +
              it +
              "h) : " +
              data.hourly[it].temp +
              "°C (" +
              data.hourly[it].weather[0].description +
              ")"
          );
    });
    return;
  }
}
