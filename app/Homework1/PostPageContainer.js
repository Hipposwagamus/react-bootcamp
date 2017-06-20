import { connect } from 'react-redux';
import { addPost, removePost, titleChange, bodyChange, loadPosts, refreshPosts } from './state';

import PostPage from './PostPage';

const mapStateToProps = (state = {}) => {
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
    titleChange: (title) => dispatch(titleChange(title)),
    loadPosts: (posts) => dispatch(loadPost(posts)),
    refreshPosts: () => dispatch(refreshPosts())
  }
}

 export default connect(mapStateToProps, mapDispatchToProps)(PostPage)
