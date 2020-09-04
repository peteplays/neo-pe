import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { months, daysInMonths } from '../../utils';
import { fetchNEO } from '../neo-list/neo-list.slice';
import { fetchParkEvents } from '../park-events/park-events.slice';
import NumberButton from './number-button';

import './search.scss';

export enum Action {
  add,
  sub
}

const currentDate = new Date();

const Search = () => {
  const dispatch = useDispatch();
  const [selectedYear, setSelectedYear] = useState<number>(currentDate.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState<number>(currentDate.getMonth());
  const [selectedDate, setSelectedDay] = useState<number>(currentDate.getDate());

  const fetchData = () => {
    dispatch(fetchNEO(`${selectedYear}-${selectedMonth + 1}-${selectedDate}`));
    dispatch(fetchParkEvents(`${selectedYear}-${selectedMonth + 1}-${selectedDate}`));
  };

  const handleYearChange = (action: Action) => {
    switch (true) {
      case action === Action.add:
        setSelectedYear(selectedYear + 1);
        setSelectedDay(1);
        break;
      case action === Action.sub:
        setSelectedYear(selectedYear - 1);
        setSelectedDay(1);
        break;
    }
  };

  const handleMonthChange = (val: number) => {
    setSelectedMonth(val);
    setSelectedDay(1);
  };

  const handleDateChange = (action: Action) => {
    const maxDaysInMonth = +daysInMonths(selectedYear)[selectedMonth];

    switch (true) {
      case action === Action.add && maxDaysInMonth > selectedDate:
        setSelectedDay(selectedDate + 1);
        break;
      case action === Action.sub && selectedDate > 1:
        setSelectedDay(selectedDate - 1);
        break;
      case action === Action.add && maxDaysInMonth === selectedDate:
        setSelectedDay(1);
        break;
      case action === Action.sub && maxDaysInMonth > selectedDate:
        setSelectedDay(maxDaysInMonth);
        break;
    }
  };

  return (
    <div id='search'>
      <NumberButton
        text={selectedYear}
        click={(a: Action) => handleYearChange(a)}
      />

      <select
        value={selectedMonth}
        onChange={e => handleMonthChange(+e.target.value)}
      >
        {months.map((m, i) => <option key={i} value={i}>{m}</option>)}
      </select>

      <NumberButton
        text={selectedDate}
        click={(a: Action) => handleDateChange(a)}
      />

      <button onClick={fetchData}>
        Submit
      </button>
    </div>
  );
};

export default Search;
