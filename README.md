# compaz | Your teleférico guide in La Paz

Find web application at https://compaz.app/

## What is compaz?

A web application to navigate the teleférico in the city of La Paz, Bolivia. compaz offers the following:

* It helps you to find out the optimal route you need to take to get to your destination.
* It will also give you an estimate of the time needed for a route. Please note that the time estimate doesn’t include queuing time (if relevant). The estimates assume a normal route in which line changes are made at an average pace and without queuing.
* The integrated map will help you visualize the route to be taken to know where in the city you are starting from and where you are arriving.
* With a complete map of the whole teleférico network in the city, you will be able to plan a trip or discover which station is closest to you.
* The application can be easily installed on any device and be run as if it were a native application. To find out how, go to our How to Install page.

## My motivation for developing compaz

The idea of compaz was born out of my love for the teleférico and how complicated I find it to navigate it every time I’m visiting La Paz.
I developed the application dedicating a lot of time and effort to create not only something that works, but also a high quality product. I’m passionate about inclusion, therefore I made an extra effort to make compaz accessible, so that users who require screen readers or can only use the keyboard shouldn’t have trouble using the application.
This work represents my gift of gratitude for all that my dear city has given me.

## Development

Requires Node 24 (see `.nvmrc`).

```sh
cp .env.example .env   # add your API keys
npm ci
npm start              # dev server on http://localhost:3000
```

| Script                                | Purpose                                              |
|---------------------------------------|------------------------------------------------------|
| `npm test`                            | Lint, Prettier check and unit tests                  |
| `npm run test:coverage`               | Unit tests with coverage                             |
| `npm run build` / `npm run start:pwa` | Type-check and production build / preview it locally |
| `npm run storybook`                   | Component catalogue on port 6006                     |
| `npm run cypress:open`                | End-to-end tests (needs the dev server running)      |
