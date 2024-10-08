# Planet Management System

![ezgif-1-d0b4288954](https://github.com/nicoleloupias/star-wars-planet-mgmt/assets/57961143/5745254f-b654-468d-88a9-bdca51e11ee2)

## Table of Contents

- [About](#about)
- [Features](#features)
- [Setup and Usage](#setup-and-usage)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Project](#running-the-project)
- [Testing](#testing)
- [Docker](#docker)
- [Future improvements](#future-improvements)

## About

The Planet Management System is a React application developed using Vite and TypeScript. This application allows users to manage and explore different planets of Star Wars world easily.

You can see it live [here](https://star-wars-planet-mgmt.netlify.app/)

## Features

- Add, edit, and delete planets
- View detailed information about each planet
- Search planets
- Sort planets
- Client side pagination on planets
- Responsive design

## Setup and Usage

### Prerequisites

Make sure you have the following installed on your system:

- [Node.js](https://nodejs.org/en/) (>= 16.x)
- [npm](https://www.npmjs.com/) (>= 6.x) or [yarn](https://yarnpkg.com/)

### Installation

1. Clone the repository:

```sh
  git clone https://github.com/nicoleloupias/star-wars-planet-mgmt.git
  cd star-wars-planet-mgmt
```

2.  Install the dependencies:

```sh
  npm install
  # or
  yarn install
```

### Running the project

To start the development server, first copy the `.env.demo` file

```sh
  cp .env.demo .env
```

Then run the following command:

```sh
  npm run dev
  # or
  yarn dev
```

This will start the application at `http://localhost:5173`

## Testing

```sh
  npm run test
  # or
  yarn test
```

To generate a test coverage report, use:

```sh
npm run coverage
# or
yarn coverage
```

## Docker

To get the docker image running, make sure to have [Docker](https://www.docker.com/products/docker-desktop/) installed and running.

Then run:

```sh
npm run docker
# or
yarn docker
```

You should see the application running in [http://localhost:80](http://localhost:80)

## Future Improvements

- Add i18n for translations.
- Improve services error handling.
- MSW handlers with mocks from outside file, split handlers for each service.
- Server side pagination.
- Remove initial getAll from App (This was added to make it easier for this initial version)
- Implement getById in PlanetService (This wasn't added to make this initial version simpler)
- Use of Suspense and skeletons.
- Implement sorting descending.
- Router paths in constants.
- Add more testing to hooks, router, services and utils.
- Get endpoint urls from constant instead of raw strings.
- Add precommit hook
