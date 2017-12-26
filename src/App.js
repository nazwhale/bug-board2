import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, reset } from 'redux-form';
import _ from 'lodash';
import { getPosts, savePost, deletePost } from './Actions/PostActions';
import './Styles/App.css'

class App extends Component {
  componentWillMount() {
    this.props.getPosts();
  }

  renderField(field) {
    return (
      <input type="text" placeholder={`Enter a ${field.label}...`}{...field.input} />
    )

  }

  onSubmit(values) {
    this.props.savePost(values)
  }

  renderPosts() {
    return _.map(this.props.posts, (post, key) => {
      return (
        <div className="card post post-item" key={key}>
          <div className="card block content">
            <h3 className="card-title">{post.title}</h3>
            <p className="card-text">{post.body}</p>
            <button onClick={() => {
              this.props.deletePost(key);
            }}>
              Delete
            </button>
          </div>
        </div>
      );
    });
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="container">
        <div className="navbar">
          <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
            <Field
              name='title'
              component={this.renderField}
              label='Title'
              class="footer-title"
              />
            <Field
              name='body'
              component={this.renderField}
              label='Body'
              class="footer-body"
              />
            <button type="submit">Post</button>
          </form>
        </div>
        <div className="main">
          { this.renderPosts() }
        </div>
      </div>
    );
  }
}

let form = reduxForm({
  form: 'NewPost'
})(App);

form = connect(state => ({
  posts: state.posts
}), { getPosts, savePost, deletePost })(form);

export default form;
