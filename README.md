# Weather widget

**Implement a simple weather widget-like application for web browser using
Node.js and React.**
The widget shows basic weather information (temperature, humidity, wind) for
a given Danish city.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

[Link to hosted Vercel App](https://simple-weather-app-nextjs.vercel.app/)

## Acceptance criteria

- [x] On the initial page load, the default city should be Copenhagen.
- [x] The widget for any given city should be sharable with a url like https://simple-weather-app-nextjs.vercel.app/?city=Odense
- [x] When the user selects a new city, the new data should be fetched by the browser and thus not require a page reload.
      Despite not reloading the page, the url should still be updated to match the selected city.
- [x] The widget should retain its basic functionality even if users disable JavaScript in a web browser.
      Full page reloads are, of course, allowed in case of disabled JavaScript
- [x] Use Node.js, TypeScript and React. Feel free to use any kind of frameworks/libraries.
- [x] Basic unit tests are a requirement, but you decide the level of coverage.
      The main point of this requirement is to see how you work with unit
      tests, not that you cover the whole code base.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Run in Docker

1. [Install Docker](https://docs.docker.com/get-docker/) on your machine
1. Build your container: `docker build -t nextjs-docker .`
1. Run your container: `docker run -p 3000:3000 nextjs-docker`

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
