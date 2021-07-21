import fetch from "node-fetch";
import { CityData } from "./city-data";
import { TextChannel } from "discord.js";
import * as city from "./city.list.json";

export class Weather {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  location: CityData | undefined;

  constructor() {
    this.data = JSON.parse(JSON.stringify(city));
  }
  public getLocation(channel: TextChannel): void {
    if (this?.location) channel.send("Current Location: " + this.location.name);
    else
      channel.send(
        "Current Location: None. You can select a location using the '!setLocation' command."
      );
  }
  public setLocation(
    city: string | undefined,
    channel: TextChannel | undefined
  ): void {
    if (city === undefined || channel === undefined) return;
    this.location = this.getLocationFromCityName(city);
    if (this.location === undefined)
      channel.send("(Error) !setLocation: Unknown Location.");
    else channel.send("Location correctly set to: " + this.location.name);
  }
  public async hourly(channel: TextChannel, hour: number): Promise<void> {
    if (this.location === undefined) {
      channel.send(
        "(Error) !hourly: Please select a location using the '!setLocation' command."
      );
      return;
    }
    const request =
      "https://api.openweathermap.org/data/2.5/onecall?lat=" +
      this.location.coord.lat +
      "&lon=" +
      this.location.coord.lon +
      "&exclude=current,minutely,daily,alerts&units=metric&lang=fr&appid=" +
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
  private getLocationFromCityName(city: string): CityData | undefined {
    for (const entry in this.data)
      if (this.data[entry].name === city) return this.data[entry];
    return;
  }
}
