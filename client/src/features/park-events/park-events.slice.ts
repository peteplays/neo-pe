import { createSlice } from '@reduxjs/toolkit'

import { AppThunk, RootState } from '../../store';

interface IState {
  loading: boolean;
  hasError: boolean;
  data: IParkEventsItem[];
}

interface IParkEventsItem {
  title: string;
  description: string;
  date: string;
  parkfullname: string;
}

const initialState: IState = {
  loading: false,
  hasError: false,
  data: [],
}

const parkEventsSlice = createSlice({
  name: 'parkEvents',
  initialState,
  reducers: {
    parkEvents: state => {
      state.loading = true;
    },
    parkEventsSuccess: (state, { payload }) => {
      state.loading = false;
      state.hasError = false;
      state.data = payload.data;
    },
    parkEventsFailure: state => {
      state.hasError = true;
    },
  },
});

const { parkEvents, parkEventsSuccess, parkEventsFailure } = parkEventsSlice.actions;

export const parkEventsSelector = (state: RootState) => state.parkEvents;

export const fetchParkEvents = (date: string, pageSize = 20, pageNumber = 1): AppThunk => async dispatch => {
  dispatch(parkEvents());

  try {
    const r = await fetch(`http://localhost:5555/park-events?pageSize=${pageSize}&pageNumber=${pageNumber}&dateStart=${date}&dateEnd=${date}`);
    const data = await r.json();

    dispatch(parkEventsSuccess(data));
  } catch (error) {
    dispatch(parkEventsFailure());
  }
}

export default parkEventsSlice.reducer;

