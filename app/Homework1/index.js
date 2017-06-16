import React from 'react'
import PropTypes from 'prop-types'
import Radium from 'radium'
import color from 'color'
import postData from './postData.js'

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
    borderBottomStyle: "solid" 
  },

  title: {
    fontSize: "2em",
    textAlign: "center"
  }

}

const Post = ({data}) => (
  <div>
    {data.map((val, i) => (
      <div key={val.id} style={styles.post}>
        <h1 style={styles.title}>{val.userId}: {val.title}</h1>
        <p>{val.body}</p>
      </div>
    ))}
  </div>
)

const SortedPost = ({sortMethod, data}) => {
  let sortedData = data.sort((a, b) => {
    if(typeof a[sortMethod] === "string"){
      console.log(a[sortMethod])
      return a[sortMethod].localeCompare(b[sortMethod]);
    } else {
      return a[sortMethod] - b[sortMethod];
    }
  })

  return <Post data={sortedData} />
}


const Homework1 = ({sortMethod}) => (
  <div>
    {sortMethod ? <SortedPost sortMethod={sortMethod} data={postData} /> : <Post data={postData} />}
  </div>
)

Homework1.propTypes = {
  sortMethod: PropTypes.oneOf(["title", "body", "userId", "id"])
}

export default Radium(Homework1)
