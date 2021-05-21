import { ActionTypes, State } from 'types';
import { APP_STATE } from '../../constants';
import { Action } from '../actionTypes';
import { reducerStrategies } from './search.reducer';

const cachedState = localStorage.getItem(APP_STATE);
const mockState = {
  loading: true,
  activeQuery: {
    type: ActionTypes.FETCH_ALL_COUNTRIES,
    value: { offset: 0 },
  },
};
export const initialState: State = cachedState ? JSON.parse(cachedState) : mockState;

export const initState = (state: State) => state;

export const reducer = (state: State, action: Action): State => {
  const reducerStrategy = reducerStrategies.find(({ check }) => check(state, action));
  if (!reducerStrategy) return { ...state };

  const partialState = reducerStrategy.reduce(state, action);
  const newState = {
    ...state,
    ...partialState,
    loading: false,
  };
  localStorage.setItem(APP_STATE, JSON.stringify({ ...newState }));
  return newState;
};
