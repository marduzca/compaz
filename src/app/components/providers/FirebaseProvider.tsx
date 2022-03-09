import React, { createContext, useContext, useEffect, useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/analytics';
import {
  useCollectionDataOnce,
  useDocumentDataOnce,
} from 'react-firebase-hooks/firestore';
import { Line, NotificationEvent, Station, VersionData } from '../domain';
import { NotificationType } from '../notification/Notification';
import { GENERAL_ERROR_NOTIFICATION_KEY } from '../notification/NotificationContainer';

interface FirebaseContext {
  stations: Station[];
  lines: Line[];
  storeMessage: (name: string, email: string, message: string) => boolean;
}

export const FirebaseContext = createContext<FirebaseContext>({
  stations: [],
  lines: [],
  storeMessage: () => true,
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

const versionDataRef = firestore.doc('metadata/versioning');
const stationsRef = firestore.collection('stations');
const linesRef = firestore.collection('lines');
const messagesRef = firestore.collection('messages');

// TODO: Find out how to write these tests:
// when nothing saved, store current data ✅
// when saved and current version, use old data ✅
// when saved and old version, store current data ✅

export const FirebaseProvider: React.FC = (props) => {
  const DATA_VERSION_KEY = 'data_version';
  const STATIONS_KEY = 'data_stations';
  const LINES_KEY = 'data_lines';

  const [dataNeedsUpdate, setDataNeedsUpdate] = useState<boolean>(false);
  const [stations, setStations] = useState<Station[]>([]);
  const [lines, setLines] = useState<Line[]>([]);

  const [currentVersionData] = useDocumentDataOnce<VersionData>(versionDataRef);
  const [currentStations] = useCollectionDataOnce<Station>(
    dataNeedsUpdate ? stationsRef.orderBy('name') : undefined,
    {
      idField: 'id',
    }
  );
  const [currentLines] = useCollectionDataOnce<Line>(
    dataNeedsUpdate ? linesRef : undefined,
    {
      idField: 'id',
    }
  );

  useEffect(() => {
    if (currentVersionData) {
      const storedDataVersion = localStorage.getItem(DATA_VERSION_KEY);

      const newVersionAvailable =
        !storedDataVersion ||
        parseInt(storedDataVersion, 10) < currentVersionData.version;

      if (newVersionAvailable) {
        setDataNeedsUpdate(true);

        if (currentStations && currentLines) {
          setStations(currentStations);
          setLines(currentLines);

          localStorage.setItem(STATIONS_KEY, JSON.stringify(currentStations));
          localStorage.setItem(LINES_KEY, JSON.stringify(currentLines));

          localStorage.setItem(
            DATA_VERSION_KEY,
            currentVersionData.version.toString()
          );
        }
      } else {
        const storedStations = JSON.parse(
          localStorage.getItem(STATIONS_KEY) as string
        ) as Station[];
        const storedLines = JSON.parse(
          localStorage.getItem(LINES_KEY) as string
        ) as Line[];

        setStations(storedStations);
        setLines(storedLines);
      }
    }
  }, [currentLines, currentStations, currentVersionData]);

  const storeMessage = (
    name: string,
    email: string,
    message: string
  ): boolean => {
    // eslint-disable-next-line no-console
    console.log(
      `Message from ${name} with email ${email}. Content: ${message}`
    );

    messagesRef
      .doc(`${email}_${Date.now()}`)
      .set({ name, email, message, timestamp: new Date() })
      .catch(() => {
        window.dispatchEvent(
          new CustomEvent('notification', {
            detail: {
              type: NotificationType.ERROR,
              content: GENERAL_ERROR_NOTIFICATION_KEY,
            } as NotificationEvent,
          })
        );

        return false;
      });

    return true;
  };

  return (
    <FirebaseContext.Provider
      value={{
        stations,
        lines,
        storeMessage,
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};

const useFirebase = (): FirebaseContext =>
  useContext<FirebaseContext>(FirebaseContext);

export { useFirebase };
