# Star Wars

## Tech Stack

- [Next.js](https://nextjs.org/) to bootstrap the app
- [React Query](https://tanstack.com/query/v3/) for server cache management
- [Vitest](https://github.com/vitest-dev/vitest) as test runner
- [Swapi](https://swapi.dev/) for the Star Wars API
- Since the test is running in a node environment using `cross-fetch` as a
  polyfill to fetch

## How to run locally

Please take the latest pull from the `main` branch and run any of
[Yarn](https://yarnpkg.com/lang/en/docs/cli/create/), or [pnpm](https://pnpm.io)
to install the dependencies.

```bash
npm run dev
npm rum test
```

```bash
yarn dev
yarn test
```

```bash
pnpm run dev
pnpm rum test
```

## Deployment

Deployed it to the cloud with
[Vercel](https://vercel.com/new?utm_source=github&utm_medium=readme&utm_campaign=next-example)
([Documentation](https://nextjs.org/docs/deployment)).

The deploeyed version can be [found here](star-wars-xi-rosy.vercel.app)

## Features completed

- [x] Character list view
- [x] List characters from the Star Wars universe (name, gender &amp; home planet, people/?page=1 would suffice).
- [x] Clicking a list entry should navigate to the character details page
- [x] Character details view, display: name, hair colour, eye colour, gender and home planet and list the films that the character has appeared in
- [x] Add appropriate unit tests

### Bonus
- [] Provide the ability to amend the height or gender of a character -- The requirement was not very clear
- [] Add e2e tests -- Didn't get time to complete the setup
- [x] Add integration tests -- Was stuck on mocking the [next router](https://github.com/vercel/next.js/issues/7479) hence couldn't get time to pick up e2e tests
- [x] Add Pagination in Character list view
