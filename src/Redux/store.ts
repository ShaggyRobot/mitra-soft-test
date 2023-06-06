import { configureStore, createAction, createReducer } from '@reduxjs/toolkit';

import { IComment, IPost, IUserDTO } from '../Api/api';
import { rootSaga, sagaMiddleware } from './saga';

interface IState {
  isFetching: boolean;
  items: IPost[];
  comments: IComment[];
  totalCount: number;
  user: IUserDTO | null;
}

const initState: IState = {
  isFetching: false,
  items: [],
  comments: [],
  totalCount: 0,
  user: null,
};

const postfetchInProgress = createAction<boolean>('postfetchInProgress');

const postFetchSucceded = createAction<{ posts: IPost[]; totalCount: number }>(
  'postFetchSucceded',
);

const commentsFetchSucceded = createAction<{
  id: number;
  comments: IComment[];
}>('commentsFetchSucceded');

const userFetchSucceded = createAction<IUserDTO>('userFetchSucceded');

const postsReducer = createReducer(initState, (builder) => {
  builder.addCase(postfetchInProgress, (state) => {
    state.isFetching = true;
  });

  builder.addCase(postFetchSucceded, (state, action) => {
    console.log('@postFetchSucceded', action.payload);
    state.isFetching = false;
    state.items = action.payload.posts;
    state.totalCount = action.payload.totalCount;
  });

  builder.addCase(commentsFetchSucceded, (state, action) => {
    const post = state.items.find((item) => item.id === action.payload.id);
    post && (post.comments = action.payload.comments);
  });

  builder.addCase(userFetchSucceded, (state, action) => {
    console.log('@userFetchSucceded');
    state.user = action.payload;
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
