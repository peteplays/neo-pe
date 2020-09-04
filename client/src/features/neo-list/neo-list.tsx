import React from 'react';
import { useSelector } from 'react-redux';

import { neoListSelector } from './neo-list.slice';
import { Loading, Error } from '../../shared';

import './neo-list.scss';

const NeoList = () => {
  const { loading, errorMessage, data } = useSelector(neoListSelector);

  const render = () => {
    if (loading) return <Loading name={'Near Earth Objects'} />;
    if (errorMessage) return <Error message={errorMessage} />;

    return (
      <>
        {!!data.length &&
          <>
            <h3>Near Earth Objects</h3>

            <ul className='neo-cards'>
              {data.map(({ name, velocity, date, missDistance, diameter, hazard, jplLink }, i) =>
                <li key={i} className='card'>
                  <ul>
                    <li><strong>Name:</strong> {name}</li>
                    <li><strong>Approach Date:</strong> {date}</li>
                    <li><strong>Miss Distance:</strong> {missDistance} miles</li>
                    <li><strong>Diameter:</strong> {diameter} feet</li>
                    <li><strong>Velocity:</strong> {velocity} MPH</li>
                    <li><strong>Hazardous:</strong> {hazard}</li>
                  </ul>

                  <a href={jplLink} target='_blank' rel='noopener noreferrer' className='button'>Link to JPL</a>
                </li>
              )}
            </ul>
          </>
        }
      </>
    );
  };

  return render();
};

export default NeoList;
