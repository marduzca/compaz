import React, { createContext, useContext, useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getAnalytics, isSupported } from 'firebase/analytics';
import { getPerformance } from 'firebase/performance';
import {
  collection,
  doc,
  getFirestore,
  orderBy,
  query,
  setDoc,
} from 'firebase/firestore';
import {
  useCollectionData,
  useDocumentData,
} from 'react-firebase-hooks/firestore';
import { Line, NotificationEvent, Station, Version } from '../../domain';
import {
  EventType,
  NotificationType,
} from '../../organisms/notification/Notification';
import { GENERAL_ERROR_NOTIFICATION_KEY } from '../../organisms/notification/NotificationContainer';
import {
  lineConverter,
  stationConverter,
  versionConverter,
} from './firestoreConverters';

interface FirebaseContextInterface {
  stations: Station[];
  lines: Line[];
  storeMessage: (
    name: string,
    email: string,
    message: string
  ) => Promise<boolean>;
}

export const FirebaseContext = createContext<FirebaseContextInterface>({
  stations: [],
  lines: [],
  storeMessage: async () => true,
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

isSupported().then((isAnalyticsSupported) => {
  if (isAnalyticsSupported && window.location.href.match(/compaz-4.web.app/)) {
    getAnalytics(firebaseApp);
    getPerformance(firebaseApp);
  }
});

const firestore = getFirestore(firebaseApp);

const appVersionRef = doc(firestore, 'metadata', 'app').withConverter(
  versionConverter
);
const dataVersionRef = doc(firestore, 'metadata', 'data').withConverter(
  versionConverter
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const APP_VERSION_KEY = 'app_version';
const DATA_VERSION_KEY = 'data_version';
const STATIONS_KEY = 'data_stations';
const LINES_KEY = 'data_lines';

interface FirebaseProviderProps {
  children: React.ReactNode;
}

export const FirebaseProvider: React.FC<FirebaseProviderProps> = (props) => {
  const [dataNeedsUpdate, setDataNeedsUpdate] = useState<boolean>(false);
  const [stations, setStations] = useState<Station[]>([]);
  const [lines, setLines] = useState<Line[]>([]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currentAppVersion] = useDocumentData<Version>(appVersionRef); // TODO: go back to use..Once hook when ready
  const [currentDataVersion] = useDocumentData<Version>(dataVersionRef); // TODO: go back to use..Once hook when ready
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
    if (currentDataVersion) {
      const storedDataVersion = localStorage.getItem(DATA_VERSION_KEY);

      const newVersionAvailable =
        !storedDataVersion || storedDataVersion !== currentDataVersion.version;

      if (newVersionAvailable) {
        setDataNeedsUpdate(true);

        if (currentStations && currentLines) {
          setStations(currentStations);
          setLines(currentLines);

          localStorage.setItem(STATIONS_KEY, JSON.stringify(currentStations));
          localStorage.setItem(LINES_KEY, JSON.stringify(currentLines));

          localStorage.setItem(
            DATA_VERSION_KEY,
            currentDataVersion.version.toString()
          );
        }
      }
    }
  }, [currentLines, currentStations, currentDataVersion]);

  const storeMessage = async (
    name: string,
    email: string,
    message: string
  ): Promise<boolean> => {
    try {
      await setDoc(doc(firestore, 'message', `${email}_${Date.now()}`), {
        name,
        email,
        message,
        timestamp: new Date(),
      });

      return true;
    } catch (error) {
      window.dispatchEvent(
        new CustomEvent(EventType.NOTIFICATION, {
          detail: {
            type: NotificationType.ERROR,
            content: GENERAL_ERROR_NOTIFICATION_KEY,
          } as NotificationEvent,
        })
      );

      return false;
    }
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

const useFirebase = (): FirebaseContextInterface =>
  useContext<FirebaseContextInterface>(FirebaseContext);

export { useFirebase };
