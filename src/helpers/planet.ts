import { Planet } from "../services/types/Planet";

export const getPlanetId = (url: Planet["url"]) => {
  return url.slice(url.length - 2, url.length - 1);
};

const DEFAULT_PLANET_COLOR = "gray.300";

export const getRandomPlanetColor = (name?: string) => {
  if (!name) return DEFAULT_PLANET_COLOR;
  const stringUniqueHash = [...name].reduce((acc, char) => {
    return char.charCodeAt(0) + ((acc << 5) - acc);
  }, 0);
  return `hsl(${stringUniqueHash % 360}, 35%,  45%)`;
};
