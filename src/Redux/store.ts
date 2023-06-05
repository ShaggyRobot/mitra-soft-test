import { configureStore, createAction, createReducer } from '@reduxjs/toolkit';

import { IPost } from '../Api/api';
import { rootSaga, sagaMiddleware } from './saga';

interface IState {
  isFetching: boolean;
  items: IPost[];
}

const initState: IState = {
  isFetching: false,
  items: [],
};

const postfetchInProgress = createAction<boolean>('postfetchInProgress');
const postFetchSucceded = createAction<IPost[]>('postFetchSucceded');

const postsReducer = createReducer(initState, (builder) => {
  builder.addCase(postfetchInProgress, (state) => {
    state.isFetching = true;
  });

  builder.addCase(postFetchSucceded, (state, action) => {
    state.isFetching = false;
    state.items = action.payload;
  });
});

const store = configureStore({
  reducer: postsReducer,
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

export { store };

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
