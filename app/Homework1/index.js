import React from 'react'
import PropTypes from 'prop-types'
import Radium from 'radium'
import color from 'color'
import postData from './postData.js'
import { Provider, connect } from 'react-redux'
import { createStore } from 'redux'
import _ from 'lodash'

/*
   Homework 1: Rendering Data

   Requirements:
   1. Render the list of post data (hint: use map)
   2. Style the posts using at least 2 css selectors and at least 10 styles
   3. Make sure there are no warnings/errors in the console
   4. Choose one (or more) of the following additional tasks:
     i.   Make the page responsive (rows when on desktop, column when on mobile)
     ii.  Sort the posts by title, alphabetically
     iii. Add a header above the posts with a creative title (style it nicely)
*/

const styles = {
  post: {
    width: "90%",
    background: "#808080",
    marginLeft: "5%",
    marginRight: "5%",
    position: "relative",
    float: "left",
    padding: "2em",
    borderBottomWidth: "5px",
    borderBottomStyle: "solid",
    listStyle: "none"
  },

  title: {
    fontSize: "2em",
    textAlign: "center"
  },

  footer: {
    fontSize: ".8em",
    textAlign: "right"
  }

}

const reducer = (state, action) => {
  if(_.isNil(state)) {
    return {
      postList: postData,
      title: "",
      body: ""
    }
  }

  console.log("hi", action)

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
  }
}

const addPost = (postValue) => ({
  type: "ADD",
  value: postValue
});

const removePost = (postIndex) => ({
  type: "REMOVE",
  index: postIndex
});

const titleChange = (title) => ({
  type: "TITLE_CHANGE",
  value: title.target.value
});

const bodyChange = (body) => ({
  type: "BODY_CHANGE",
  value: body.target.value
})

const store = createStore(reducer);

const PostList = ({data, deletePost}) => (
  <ul>
    {data.map((val, i) => (
      <li key={val.id} style={styles.post}>
        <h1 style={styles.title}>{val.title}</h1>
        <p>{val.body}</p>
        <div style={styles.footer}>Created by: {val.userId} <button onClick={() => deletePost(i)}>delete</button></div>
      </li>
    ))}
  </ul>
)

const SortedPostList = ({sortMethod, data, deletePost}) => {
  let sortedData = data.sort((a, b) => {
    if(typeof a[sortMethod] === "string"){
      return a[sortMethod].localeCompare(b[sortMethod]);
    } else {
      return a[sortMethod] - b[sortMethod];
    }
  })

  return <PostList data={sortedData} deletePost={deletePost}/>
}

let PostPage = ({sortMethod, postList, titleText, bodyText, addPost, deletePost, bodyChange, titleChange}) => (
  <div>
    <h2>Title</h2>
    <input onChange={titleChange}></input>
    <h2>Body</h2>
    <input onChange={bodyChange}></input>
    <button onClick={() => addPost({userId: 1, title: titleText, body: bodyText, id: postList.length + 1})}>Add Post</button>
    <div>
      {sortMethod ? <SortedPostList sortMethod={sortMethod} data={postList} deletePost={deletePost}/> : <PostList data={postList} deletePost={deletePost}/>}
    </div>
  </div>
)

const mapStateToProps = (state) => {
  return {
    titleText: state.title,
    bodyText: state.body,
    postList: state.postList
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    addPost: (post) => dispatch(addPost(post)),
    deletePost: (index) => dispatch(removePost(index)),
    bodyChange: (body) => dispatch(bodyChange(body)),
    titleChange: (title) => dispatch(titleChange(title))
  }
}

PostPage = connect(mapStateToProps, mapDispatchToProps)(PostPage)

const Homework1 = ({sortMethod}) => (
  <Provider store={store}>
    <PostPage sortMethod={sortMethod} />
  </Provider>
)

Homework1.propTypes = {
  sortMethod: PropTypes.oneOf(["title", "body", "userId", "id"])
}

export default Radium(Homework1)
