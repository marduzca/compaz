import React from 'react';

interface RoutesOverviewProps {
  route: string[];
}

const RoutesOverview: React.FC<RoutesOverviewProps> = (props) => (
  <div>
    {props.route.map((station, index) => {
      if (index === props.route.length - 1) {
        return <p>{`${station}`}</p>;
      }

      return (
        <>
          <p>{`${station}`}</p>
          <p>V</p>
        </>
      );
    })}
  </div>
);
export default RoutesOverview;
