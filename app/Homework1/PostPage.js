import React from 'react';

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
    {postList ? 
      <div>
        {sortMethod ? <SortedPostList sortMethod={sortMethod} data={postList} deletePost={deletePost}/> : <PostList data={postList} deletePost={deletePost}/>}
      </div> :
      <div></div>
    }
  </div>
)

export default PostPage;