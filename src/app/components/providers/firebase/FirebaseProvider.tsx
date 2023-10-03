import React, { createContext, useContext } from 'react';
import { FirebaseOptions, initializeApp } from 'firebase/app';
import { doc, getFirestore, setDoc } from 'firebase/firestore';
import { Line, NotificationEvent, Station } from '../../domain';
import {
  EventType,
  NotificationType,
} from '../../organisms/notification/Notification';
import { GENERAL_ERROR_NOTIFICATION_KEY } from '../../organisms/notification/NotificationContainer';
import stationsJson from '../../../../../data/stations.json';
import linesJson from '../../../../../data/lines.json';

interface FirebaseContextInterface {
  stations: Station[];
  lines: Line[];
  storeMessage: (
    name: string,
    email: string,
    message: string,
  ) => Promise<boolean>;
}

export const FirebaseContext = createContext<FirebaseContextInterface>({
  stations: [],
  lines: [],
  storeMessage: async () => true,
});

const firebaseProdConfig: FirebaseOptions = {
  apiKey: 'AIzaSyCOp-cYAUCxncqLQAcWCCNzD5Wj6NOTDTc',
  authDomain: 'compaz-4.firebaseapp.com',
  projectId: 'compaz-4',
  storageBucket: 'compaz-4.appspot.com',
  messagingSenderId: '650973362685',
  appId: '1:650973362685:web:5f5ea20f88b0788c5c8194',
  measurementId: 'G-BG76THH0ZB',
};

const firebaseDevConfig: FirebaseOptions = {
  apiKey: 'AIzaSyAT1dGP4E4sQ5mDmK46DST0hBxwiE8aRhs',
  authDomain: 'compaz-dev.firebaseapp.com',
  projectId: 'compaz-dev',
  storageBucket: 'compaz-dev.appspot.com',
  messagingSenderId: '160278539724',
  appId: '1:160278539724:web:df58d3fa75515f91e70169',
  measurementId: 'G-3G1XQ74N3F',
};

const firebaseApp = initializeApp(
  window.location.hostname.match(/compaz.app/)
    ? firebaseProdConfig
    : firebaseDevConfig,
);

const firestore = getFirestore(firebaseApp);

const stations: Station[] = stationsJson;
const lines: Line[] = linesJson;

interface FirebaseProviderProps {
  children: React.ReactNode;
}

export const FirebaseProvider: React.FC<FirebaseProviderProps> = (props) => {
  const storeMessage = async (
    name: string,
    email: string,
    message: string,
  ): Promise<boolean> => {
    try {
      await setDoc(doc(firestore, 'message', `${Date.now()}_${email}`), {
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
        }),
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
