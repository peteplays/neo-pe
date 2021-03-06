import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { parkEventsSelector } from './park-events.slice';
import { Loading, Error } from '../../shared';

import './park-events.scss';

const ParkEvents = () => {
  const { loading, errorMessage, data } = useSelector(parkEventsSelector);
  const [eventDescription, setEventDescription] = useState('');

  const handleDisplayingEventDescription = (title: string) => {
    title === eventDescription
      ? setEventDescription('')
      : setEventDescription(title);
  };

  const render = () => {
    if (loading) return <Loading name={'Park Events'} />;
    if (errorMessage) return <Error message={errorMessage} />;

    return (
      <div id='park-events'>
        {!!data.length &&
          <>
            <h3>Park Events</h3>

            <ul>
              {data.map(({ title, date, description, parkfullname }, i) =>
                <li key={i} className='card'>
                  <button onClick={() => handleDisplayingEventDescription(title)}>
                    {eventDescription === title ? 'Hide' : 'Show'} Description
                  </button>

                  <p>
                    <em>{title}</em> is happening on {date} {parkfullname ? `at ${parkfullname}` : ''}
                  </p>

                  <div
                    dangerouslySetInnerHTML={{ __html: description }}
                    className={`slider ${eventDescription === title ? '' : 'closed'}`}
                  />
                </li>
              )}
            </ul>
          </>
        }
      </div>
    );
  };

  return render();
};

export default ParkEvents;
