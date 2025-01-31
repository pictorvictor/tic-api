import TestingRouter from './api/testing/testing.router';
import { App } from './app';

const routes = [
  new TestingRouter(),
];

const app = new App(routes);

app.listen();

process.on('unhandledRejection', (error) => {
  console.error('unhandledRejection', error);
});

process.on('uncaughtException', (error) => {
  console.error('uncaughtException', error);
});
