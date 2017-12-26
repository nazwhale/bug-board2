import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, reset } from 'redux-form';
import _ from 'lodash';
import { getPosts, savePost, deletePost } from './Actions/PostActions';

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
        <div>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
          <button onClick={() => {
            this.props.deletePost(key);
          }}>
            Delete
          </button>
        </div>
      );
    });
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <div>
        <div>
          <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
            <Field
              name='title'
              component={this.renderField}
              label='Title'
              class=""
              />
            <Field
              name='body'
              component={this.renderField}
              label='Body'
              class=""
              />
            <button type="submit">Post</button>
          </form>
        </div>
        <div>
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
