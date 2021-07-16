import fetch from "node-fetch";

const paris =
  "https://api.openweathermap.org/data/2.5/weather?q=Paris&appid=" +
  process.env.OPEN_WEATHER +
  "&units=metric";

export class Weather {
  static async execute(): Promise<string> {
    return (await fetch(paris)).json();
  }
}
