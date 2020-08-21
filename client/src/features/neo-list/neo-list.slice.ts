import { createSlice } from '@reduxjs/toolkit'

import { AppThunk, RootState } from '../../store';
import { flattenNEO } from '../../utils';

interface IState {
  loading: boolean;
  hasError: boolean;
  data: INEOListItem[];
}

export interface INEORawData {
  near_earth_objects: {
    [k: string]: {
      is_potentially_hazardous_asteroid: boolean;
      name: string;
      nasa_jpl_url: string;
      estimated_diameter: {
        feet: {
          estimated_diameter_max: number;
          estimated_diameter_min: number;
        },
      },
      close_approach_data: {
        close_approach_date: string;
        miss_distance: {
          miles: string;
        },
        relative_velocity: {
          miles_per_hour: string;
        },
      }[],
    }[],
  };
};

export interface INEOListItem {
  velocity: string;
  date: string;
  diameter: string;
  hazard: string;
  name: string;
  jplLink: string;
  missDistance: string;
}

const initialState: IState = {
  loading: false,
  hasError: false,
  data: [],
}

const neoListSlice = createSlice({
  name: 'neoList',
  initialState,
  reducers: {
    neoList: state => {
      state.loading = true;
    },
    neoListSuccess: (state, { payload }) => {
      state.loading = false;
      state.hasError = false;
      state.data = payload;
    },
    neoListFailure: state => {
      state.hasError = true;
    },
  },
});

const { neoList, neoListSuccess, neoListFailure } = neoListSlice.actions;

export const neoListSelector = (state: RootState) => state.neoList;

export const fetchNEO = (date: string): AppThunk => async dispatch => {
  dispatch(neoList());

  try {
    const r = await fetch(`http://localhost:5555/nasa-neo?start_date=${date}&end_date=${date}`);
    const data = await r.json();

    dispatch(neoListSuccess(flattenNEO(data)));
  } catch (error) {
    dispatch(neoListFailure());
  }
}

export default neoListSlice.reducer;
