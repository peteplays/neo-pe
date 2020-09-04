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
    const year = action === Action.add
      ? selectedYear + 1
      : selectedYear - 1;

    setSelectedYear(year);
    setDayPerYearAndMonth(year, selectedMonth);
  };

  const handleMonthChange = (month: number) => {
    setSelectedMonth(month);
    setDayPerYearAndMonth(selectedYear, month);
  };

  const handleDateChange = (action: Action) => {
    const maxDaysInMonth = daysInMonths(selectedYear)[selectedMonth];

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

  const setDayPerYearAndMonth = (year: number, month: number) => {
    const maxDaysInMonth = daysInMonths(year)[month];

    maxDaysInMonth > selectedDate
      ? setSelectedDay(selectedDate)
      : setSelectedDay(maxDaysInMonth);
  }

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
