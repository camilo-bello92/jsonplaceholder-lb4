import {JsonplaceholderLb4Application} from './application';
import {ApplicationConfig} from '@loopback/core';

export {JsonplaceholderLb4Application};

export async function main(options: ApplicationConfig = {}) {
  const app = new JsonplaceholderLb4Application(options);
  await app.boot();
  await app.start();

  const url = app.restServer.url;
  console.log(`Server is running at ${url}`);
  console.log(`Try ${url}/ping`);

  return app;
}
