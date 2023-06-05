import { call, put, takeEvery } from 'redux-saga/effects';
import createSagaMiddlware from '@redux-saga/core';

import { IPost, getPosts } from '../Api/api';
import { delay } from '../Utils';

interface IFetchPostsPayload {
  start: number;
  limit: number;
}

function* fetchPosts({
  payload,
}: {
  type: 'postFetchRequested';
  payload: IFetchPostsPayload;
}) {
  const { start, limit } = payload;
  yield put({ type: 'postfetchInProgress' });
  yield delay(1000);
  const posts: IPost[] = yield call(getPosts, start, limit);
  yield put({ type: 'postFetchSucceded', payload: posts });
}

function* rootSaga() {
  yield takeEvery('postFetchRequested', fetchPosts);
}

const fetchPostsAction = (payload: IFetchPostsPayload) => ({
  type: 'postFetchRequested',
  payload,
});

const sagaMiddleware = createSagaMiddlware();

export { sagaMiddleware, rootSaga, fetchPostsAction };
