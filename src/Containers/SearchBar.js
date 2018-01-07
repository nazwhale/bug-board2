import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { displaySearchResults } from '../Actions/SearchActions';

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = { term: '' };

    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onInputChange(event) {
    this.setState({ term: event.target.value });
  }

  onFormSubmit(event) {
    displaySearchResults(this.state.term);
    event.preventDefault();
    this.setState({ term: '' });
  }

  onSearch() {
    this.displaySearchResults(this.state.term);
  }

  render() {
    return (
      <form onSubmit={ this.onFormSubmit } className="input-group">
        <input
          placeholder="Search for a bug..."
          className="form-control search-bar"
          value={ this.state.term }
          onChange={ this.onInputChange } />
      </form>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ displaySearchResults }, dispatch);
}

export default connect(null, mapDispatchToProps)(SearchBar);
