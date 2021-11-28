import * as functions from 'firebase-functions';

export const helloWorld = functions.https.onRequest((request, response) => {
  response.setHeader('Access-Control-Allow-Origin', '*');

  functions.logger.info('Hello logs!', { structuredData: true });
  response.send('Hello from Firebase!');
});
