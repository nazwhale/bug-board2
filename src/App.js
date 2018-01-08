import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './styles/app.css'
import { Field, reduxForm }  from 'redux-form';
import _ from 'lodash';
import { getPosts, savePost } from './actions/post_actions';
import SearchBar from './containers/search_bar';
import Card from './containers/card';

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

  // filterSearchResults(searchTerm) {
  //   _.map(this.props.posts, (post) => {
  //     if
  //   })
  // }

  renderPosts() {
    console.log(this.props.searchTerm)
    return _.map(this.props.posts, (post, key) => {
      return (
        <div>
          <Card post={post} dupeKey={key} />
        </div>
      );
    });
  }

  render() {
    const { handleSubmit } = this.props;
    // extract input box into container
    return (
      <div className='container'>
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

function mapStateToProps({ posts, searchTerm }) {
  return { posts, searchTerm };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getPosts, savePost }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(form);
