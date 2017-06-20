import { createStore, applyMiddleware } from 'redux';
import _ from 'lodash';
import postData from './postData';
import createSagaMiddleware, { delay } from 'redux-saga'
import { effects } from 'redux-saga';
import axios from 'axios';

const { put, call, takeLatest, select, all } = effects;

const reducer = (state, action) => {
  if(_.isNil(state)) {
    return {
      postList: [],
      title: "",
      body: ""
    }
  }

  switch(action.type) {
    case "ADD": {
      let postListCopy = _.cloneDeep(state.postList);
      postListCopy.push(action.value);
      return { ...state, postList: postListCopy};
    }
    case "REMOVE": {
      let postListCopy = _.cloneDeep(state.postList);
      postListCopy.splice(action.index, 1)
      return {...state, postList: postListCopy};
    }
    case "TITLE_CHANGE": {
      return { ...state, title: action.value}
    }
    case "BODY_CHANGE": {
      return { ...state, body: action.value} 
    }
    case "LOAD_POSTS": {
      return { ...state, postList: action.value}
    }
  }
  return state;
}

export const addPost = (postValue) => ({
  type: "ADD",
  value: postValue
});

export const removePost = (postIndex) => ({
  type: "REMOVE",
  index: postIndex
});

export const titleChange = (title) => ({
  type: "TITLE_CHANGE",
  value: title.target.value
});

export const bodyChange = (body) => ({
  type: "BODY_CHANGE",
  value: body.target.value
})

export const loadPosts = (posts) => ({
  type: "LOAD_POSTS",
  value: posts
})

export const refreshPosts = () => ({
  type: "REFRESH_POSTS"
})

export function * loadSaga() {
  const request = yield call(axios.get, "https://jsonplaceholder.typicode.com/posts");
  yield put(loadPosts(request.data));
}

function * rootSaga() {
  yield all([
    takeLatest("REFRESH_POSTS", loadSaga),
    put(refreshPosts())
  ]);
}

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

export default store;