import { call, put, takeEvery } from 'redux-saga/effects';
import createSagaMiddlware from '@redux-saga/core';

import { getComments, getPosts, getUser } from '../Api/api';

import { delay } from '../Utils';
import { IComment, IPost, IUserDTO } from '../Api/types';

function* fetchPosts() {
  yield put({ type: 'postfetchInProgress' });
  yield delay(1000);
  const posts: IPost[] = yield call(getPosts);
  yield put({ type: 'postFetchSucceded', payload: posts });
}

function* fetchComments({
  payload,
}: {
  type: 'commentsFetchRequested';
  payload: number;
}) {
  const postId = payload;
  const comments: IComment[] = yield call(getComments, postId);

  yield put({ type: 'commentsFetchSucceded', payload: comments });
}

function* fetchUser({
  payload,
}: {
  type: 'userFetchRequested';
  payload: number;
}) {
  const userId = payload;
  yield put({ type: 'postfetchInProgress' });
  yield delay(500);
  const user: IUserDTO = yield call(getUser, userId);

  yield put({ type: 'userFetchSucceded', payload: user });
}

function* rootSaga() {
  yield takeEvery('postFetchRequested', fetchPosts);
  yield takeEvery('commentsFetchRequested', fetchComments);
  yield takeEvery('userFetchRequested', fetchUser);
}

const fetchPostsAction = () => ({
  type: 'postFetchRequested',
});

const fetchCommentsAction = (payload: number) => ({
  type: 'commentsFetchRequested',
  payload,
});

const fetchUserAction = (payload: number) => ({
  type: 'userFetchRequested',
  payload,
});

const sagaMiddleware = createSagaMiddlware();

export {
  sagaMiddleware,
  rootSaga,
  fetchPostsAction,
  fetchCommentsAction,
  fetchUserAction,
};
