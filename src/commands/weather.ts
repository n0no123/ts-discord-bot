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
    this.location = {
      id: 2968815,
      name: "Paris",
      state: "",
      country: "FR",
      coord: { lon: 2.3486, lat: 48.853401 },
    };
  }
  public getCurrentLocation(channel: TextChannel): void {
    channel.send("Current Location: " + this?.location?.name);
  }
  public setLocation(
    city: string | undefined,
    channel: TextChannel | undefined
  ): void {
    if (city === undefined || channel === undefined) return;
    const location = this.getLocationFromCityName(city);
    if (location === undefined)
      channel.send("(Error) !setLocation: Unknown Location.");
    else {
      this.location = location;
      channel.send("Location correctly set to: " + this.location.name);
    }
  }
  public async hourly(channel: TextChannel, hour: number): Promise<void> {
    channel.send(
      `Weather forecast for the next eight hours in ${this.location?.name}:`
    );
    const request = `https://api.openweathermap.org/data/2.5/onecall?lat=${this.location?.coord.lat}&lon=${this.location?.coord.lon}&exclude=current,minutely,daily,alerts&units=metric&appid=${process.env.OPEN_WEATHER}`;
    (await fetch(request)).json().then((data) => {
      for (let it = hour; it < hour + 8; it++)
        channel.send(
          `${it < 12 ? (it === 0 ? 12 : it) : it === 12 ? 12 : it - 12} ${
            it < 12 ? "a.m." : "p.m."
          } -> ${data.hourly[it].temp}°C (${
            data.hourly[it].weather[0].description
          })`
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
