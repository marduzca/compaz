import React from 'react';
import styles from './TotalRouteTime.module.css';

interface TotalRouteTimeProps {
  totalTime: number;
}

const TotalRouteTime: React.FC<TotalRouteTimeProps> = (props) => {
  const convertMinutesToHoursMinutes = (
    givenMinutes: number
  ): React.ReactNode => {
    const resultHours = Math.floor(givenMinutes / 60);
    const resultMinutes = givenMinutes % 60;

    return (
      <div className={styles.totalTime}>
        <span>{resultHours} h</span>
        {resultMinutes ? <span>{resultMinutes} min</span> : null}
      </div>
    );
  };

  return (
    <>
      {props.totalTime < 60 ? (
        <span className={styles.totalTime}>{props.totalTime} min</span>
      ) : (
        convertMinutesToHoursMinutes(props.totalTime)
      )}
    </>
  );
};

export default TotalRouteTime;
