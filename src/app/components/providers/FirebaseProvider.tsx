import React, { createContext, useContext } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { useCollectionDataOnce } from 'react-firebase-hooks/firestore';
import { Line, Station } from '../domain';

interface FirebaseContext {
  stations: Station[];
  lines: Line[];
}

export const FirebaseContext = createContext<FirebaseContext>({
  stations: [],
  lines: [],
});

firebase.initializeApp({
  apiKey: 'AIzaSyCOp-cYAUCxncqLQAcWCCNzD5Wj6NOTDTc',
  authDomain: 'compaz-4.firebaseapp.com',
  projectId: 'compaz-4',
  storageBucket: 'compaz-4.appspot.com',
  messagingSenderId: '650973362685',
  appId: '1:650973362685:web:5f5ea20f88b0788c5c8194',
  measurementId: 'G-BG76THH0ZB',
});

const firestore = firebase.firestore();
const analytics = firebase.analytics();

firestore.enablePersistence({ synchronizeTabs: true }).catch(() =>
  // eslint-disable-next-line no-console
  console.warn(
    "Enable persistence failed. Currently retrieved data won't be persisted"
  )
);

const stationsRef = firestore.collection('stations');
const linesRef = firestore.collection('lines');

export const FirebaseProvider: React.FC = (props) => {
  const [stations] = useCollectionDataOnce<Station>(
    stationsRef.orderBy('name'),
    {
      idField: 'id',
    }
  );
  const [lines] = useCollectionDataOnce<Line>(linesRef, {
    idField: 'id',
  });

  analytics.logEvent('firestore data retrieved started');

  return (
    <FirebaseContext.Provider
      value={{
        stations: stations || [],
        lines: lines || [],
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};

const useFirebase = (): FirebaseContext =>
  useContext<FirebaseContext>(FirebaseContext);

export { useFirebase };
