import "@testing-library/jest-dom";
import { cleanup } from "@testing-library/react";
import { afterEach, beforeAll, vi } from "vitest";
import { server } from "./mocks/server";

beforeAll(() => {
  vi.stubEnv("API_URL", "https://swapi.dev/api");
  vi.stubEnv("VITE_API_URL", "https://swapi.dev/api");
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
  cleanup();
  vi.unstubAllEnvs();
});
