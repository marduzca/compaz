import React, { createContext, useContext } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { useCollectionDataOnce } from 'react-firebase-hooks/firestore';
import { Station } from '../domain';

interface FirebaseContext {
  stations: Station[];
}

export const FirebaseContext = createContext<FirebaseContext>({
  stations: [],
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

firestore.enablePersistence({ synchronizeTabs: true }).catch(() =>
  // eslint-disable-next-line no-console
  console.warn(
    "Enable persistence failed. Currently retrieved data won't be persisted"
  )
);

const stationsRef = firestore.collection('stations');

export const FirebaseProvider: React.FC = (props) => {
  const [stations] = useCollectionDataOnce<Station>(
    stationsRef.orderBy('name'),
    {
      idField: 'id',
    }
  );

  return (
    <FirebaseContext.Provider
      value={{
        stations: stations || [],
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};

const useFirebase = (): FirebaseContext =>
  useContext<FirebaseContext>(FirebaseContext);

const useStations = (): { stations: Station[] } => {
  const { stations } = useContext<FirebaseContext>(FirebaseContext);
  return { stations };
};

export { useFirebase, useStations };
