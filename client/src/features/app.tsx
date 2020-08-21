import React from 'react';

import NeoList from './neo-list/neo-list';
import ParkEvents from './park-events/park-events';
import Search from './search/search';

import './app.scss';

const App = () => {
  return (
    <main>
      <h1>
        Welcome to the Near Earth Objects and Park Events finder!
      </h1>

      <p>
        Select a date to find near earth objects and park events happening on the same day.
      </p>

      <Search />

      <div className='lists'>
        <div>
          <NeoList />
        </div>
        <div>
          <ParkEvents />
        </div>
      </div>
    </main>
  );
};

export default App;
