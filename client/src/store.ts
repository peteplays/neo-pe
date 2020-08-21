import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import neoListReducer from './features/neo-list/neo-list.slice';
import parkEventsReducer from './features/park-events/park-events.slice';

export const store = configureStore({
  reducer: {
    neoList: neoListReducer,
    parkEvents: parkEventsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
