import * as functions from 'firebase-functions';

export const helloWorld = functions.https.onRequest((request, response) => {
  response.setHeader('Access-Control-Allow-Origin', '*');

  functions.logger.info('Hello logs!', { structuredData: true });
  response.send('Hello from Firebase!');
});

// TODO: Write necessary functions + use in frontend
// 1: Get shortest route
// 2: Firestore stuff?
// 3: Google Maps Key
