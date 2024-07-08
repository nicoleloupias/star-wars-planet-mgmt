import type { HttpHandler } from "msw";
import { http, HttpResponse } from "msw";
import { BASE_API_URL } from "../services";

export const handlers: HttpHandler[] = [
  http.get(`${BASE_API_URL}/planets/`, () => {
    return HttpResponse.json({
      count: 60,
      next: "https://swapi.dev/api/planets/?page=2",
      previous: null,
      results: [
        {
          name: "Tatooine",
          rotation_period: "23",
          orbital_period: "304",
          diameter: "10465",
          climate: "arid",
          gravity: "1 standard",
          terrain: "desert",
          surface_water: "1",
          population: "200000",
          residents: [
            "https://swapi.dev/api/people/1/",
            "https://swapi.dev/api/people/2/",
            "https://swapi.dev/api/people/4/",
            "https://swapi.dev/api/people/6/",
            "https://swapi.dev/api/people/7/",
            "https://swapi.dev/api/people/8/",
            "https://swapi.dev/api/people/9/",
            "https://swapi.dev/api/people/11/",
            "https://swapi.dev/api/people/43/",
            "https://swapi.dev/api/people/62/"
          ],
          films: [
            "https://swapi.dev/api/films/1/",
            "https://swapi.dev/api/films/3/",
            "https://swapi.dev/api/films/4/",
            "https://swapi.dev/api/films/5/",
            "https://swapi.dev/api/films/6/"
          ],
          created: "2014-12-09T13:50:49.641000Z",
          edited: "2014-12-20T20:58:18.411000Z",
          url: "https://swapi.dev/api/planets/1/"
        },
        {
          name: "Alderaan",
          rotation_period: "24",
          orbital_period: "364",
          diameter: "12500",
          climate: "temperate",
          gravity: "1 standard",
          terrain: "grasslands, mountains",
          surface_water: "40",
          population: "2000000000",
          residents: [
            "https://swapi.dev/api/people/5/",
            "https://swapi.dev/api/people/68/",
            "https://swapi.dev/api/people/81/"
          ],
          films: ["https://swapi.dev/api/films/1/", "https://swapi.dev/api/films/6/"],
          created: "2014-12-10T11:35:48.479000Z",
          edited: "2014-12-20T20:58:18.420000Z",
          url: "https://swapi.dev/api/planets/2/"
        }
      ]
    });
  }),
  http.get(`${BASE_API_URL}/people/:id`, () => {
    return HttpResponse.json({
      name: "Poggle the Lesser",
      height: "183",
      mass: "80",
      hair_color: "none",
      skin_color: "green",
      eye_color: "yellow",
      birth_year: "unknown",
      gender: "male",
      homeworld: "https://swapi.dev/api/planets/11/",
      films: ["https://swapi.dev/api/films/5/", "https://swapi.dev/api/films/6/"],
      species: ["https://swapi.dev/api/species/28/"],
      vehicles: [],
      starships: [],
      created: "2014-12-20T16:40:43.977000Z",
      edited: "2014-12-20T21:17:50.453000Z",
      url: "https://swapi.dev/api/people/63/"
    });
  })
];
