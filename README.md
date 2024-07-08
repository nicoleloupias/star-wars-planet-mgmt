# Planet Management System

## Table of Contents

- [About](#about)
- [Features](#features)
- [Setup and Usage](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Project](#running-the-project)
- [Testing](#testing)
- [Docker](#docker)

## About

The Planet Management System is a React application developed using Vite and TypeScript. This application allows users to manage and explore different planets of Star Wars world easily.

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

- [Node.js](https://nodejs.org/en/) (>= 14.x)
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

To start the development server, run the following commands:

```sh
  npm run dev
  cp .env.demo .env
  # or
  yarn dev
  cp .env.demo .env
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
