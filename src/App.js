import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Field, reduxForm, reset } from 'redux-form';
import _ from 'lodash';
import { getPosts, savePost, deletePost, setCompleted, setIncomplete, upvote } from './Actions/PostActions';
import './Styles/App.css'
import SearchBar from './Containers/SearchBar';

class App extends Component {

  componentWillMount() {
    this.props.getPosts();
  }

  renderField(field) {
    return (
      <input type='text' placeholder={`Enter a ${field.label}...`}{...field.input} />
    )
  }

  onSubmit(values) {
    values.completed = false;
    values.votes = 0;
    this.props.savePost(values);
  }

  changeStatus(post, key) {
    if (!post.completed) {
      this.props.setCompleted(key);
    } else {
      this.props.setIncomplete(key);
    };
  }

  setDoneColor(post) {
    return post.completed ? 'btn btn-done' : 'btn btn-incomplete';
  }

  renderPosts() {
    return _.map(this.props.posts, (post, key) => {
      return (
        // extract into card container
        <div className='card post post-item' key={key}>
          <div className='card block'>
            <h3 className='card-title'>{post.title}</h3>

            <h3>{ post.votes }</h3>

            <a className='card-text'>{post.body}</a>

            <button className={this.setDoneColor(post)} onClick={() => {
              this.changeStatus(post, key);
            }}>
              Done
            </button>

            <button className='btn btn-danger' onClick={() => {
              this.props.deletePost(key);
            }}>
              X
            </button>

            <button className='btn btn-upvote' onClick={() => {
                this.props.upvote(key, post.votes);
              }}>
              ^
            </button>

          </div>
        </div>
      );
    });
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <div className='container'>
        // extract input box into container
        <div className='navbar'>
          <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
            <Field
              name='title'
              component={this.renderField}
              label='Title'
              class='footer-title'
              />
            <Field
              name='body'
              component={this.renderField}
              label='Body'
              class='footer-body'
              />
            <button type='submit'>Post</button>
          </form>
        </div>

        <SearchBar />
        <div className='main'>
          { this.renderPosts() }
        </div>
      </div>
    );
  }
}

let form = reduxForm({
  form: 'NewPost'
})(App);

function mapStateToProps({ posts }) {
  return { posts };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getPosts, savePost, deletePost, setCompleted, setIncomplete, upvote }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(form);
