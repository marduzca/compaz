import React, { createContext, useContext, useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import {
  collection,
  doc,
  getFirestore,
  orderBy,
  query,
  setDoc,
} from 'firebase/firestore';
import 'firebase/analytics';
import 'firebase/performance';
import {
  useCollectionData,
  useDocumentData,
} from 'react-firebase-hooks/firestore';
import { Line, NotificationEvent, Station, VersionData } from '../domain';
import { NotificationType } from '../notification/Notification';
import { GENERAL_ERROR_NOTIFICATION_KEY } from '../notification/NotificationContainer';
import {
  stationConverter,
  lineConverter,
  versionDataConverter,
} from './firestoreConverters';

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

const firebaseApp = initializeApp({
  apiKey: 'AIzaSyCOp-cYAUCxncqLQAcWCCNzD5Wj6NOTDTc',
  authDomain: 'compaz-4.firebaseapp.com',
  projectId: 'compaz-4',
  storageBucket: 'compaz-4.appspot.com',
  messagingSenderId: '650973362685',
  appId: '1:650973362685:web:5f5ea20f88b0788c5c8194',
  measurementId: 'G-BG76THH0ZB',
});

const firestore = getFirestore(firebaseApp);

const versionDataRef = doc(firestore, 'metadata', 'versioning').withConverter(
  versionDataConverter
);
const stationsRef = query(
  collection(firestore, 'stations').withConverter(stationConverter),
  orderBy('name')
);
const linesRef = collection(firestore, 'lines').withConverter(lineConverter);

// TODO: Find out how to write these tests:
// when nothing saved, store current data ✅
// when saved and current version, use old data ✅
// when saved and old version, store current data ✅

interface FirebaseProviderProps {
  children: React.ReactNode;
}

export const FirebaseProvider: React.FC<FirebaseProviderProps> = (props) => {
  const DATA_VERSION_KEY = 'data_version';
  const STATIONS_KEY = 'data_stations';
  const LINES_KEY = 'data_lines';

  const [dataNeedsUpdate, setDataNeedsUpdate] = useState<boolean>(false);
  const [stations, setStations] = useState<Station[]>([]);
  const [lines, setLines] = useState<Line[]>([]);

  const [currentVersionData] = useDocumentData<VersionData>(versionDataRef); // TODO: go back to use..Once hook when ready
  const [currentStations] = useCollectionData<Station>( // TODO: go back to use..Once hook when ready
    dataNeedsUpdate ? stationsRef : undefined
  );
  const [currentLines] = useCollectionData<Line>( // TODO: go back to use..Once hook when ready
    dataNeedsUpdate ? linesRef : undefined
  );

  useEffect(() => {
    const storedDataVersion = localStorage.getItem(DATA_VERSION_KEY);

    if (storedDataVersion) {
      const storedStations = JSON.parse(
        localStorage.getItem(STATIONS_KEY) as string
      ) as Station[];
      const storedLines = JSON.parse(
        localStorage.getItem(LINES_KEY) as string
      ) as Line[];

      setStations(storedStations);
      setLines(storedLines);
    }
  }, []);

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
      }
    }
  }, [currentLines, currentStations, currentVersionData]);

  const storeMessage = (
    name: string,
    email: string,
    message: string
  ): boolean => {
    setDoc(doc(firestore, 'messages', `${email}_${Date.now()}`), {
      name,
      email,
      message,
      timestamp: new Date(),
    }).catch(() => {
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
