export class CityData {
  id: number;
  name: string;
  state: string;
  country: string;
  coord: { lon: number; lat: number };
  constructor(data: {
    id: number;
    name: string;
    state: string;
    country: string;
    coord: { lon: number; lat: number };
  }) {
    this.id = data.id;
    this.name = data.name;
    this.state = data.state;
    this.country = data.country;
    this.coord = data.coord;
  }
}
