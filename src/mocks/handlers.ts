import type { HttpHandler } from "msw";
import { http, HttpResponse } from "msw";
import { BASE_API_URL } from "../services";
import { planetsMock } from "./planet";

export const handlers: HttpHandler[] = [
  http.get(`${BASE_API_URL}/planets/`, () => {
    return HttpResponse.json({
      count: 60,
      next: "https://swapi.dev/api/planets/?page=2",
      previous: null,
      results: planetsMock
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
