import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import '../styles/app.css'
import '../styles/bounce.css'
import Modal from 'react-modal';
import { setCompleted, setIncomplete, deletePost, upvote } from '../actions/post_actions';

const modalStyle = {
  overlay : {
    position          : 'fixed',
    top               : 300,
    left              : 500,
    right             : 500,
    bottom            : 300,
    backgroundColor   : 'transparent',
    zIndex            : 99
  },
  content : {
    position                   : 'absolute',
    top                        : '40px',
    left                       : '40px',
    right                      : '40px',
    bottom                     : '40px',
    border                     : '1px solid #ccc',
    background                 : '#fff',
    overflow                   : 'auto',
    WebkitOverflowScrolling    : 'touch',
    borderRadius               : '4px',
    outline                    : 'none',
    padding                    : '20px',
  }
}

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = { modalOpen : false, modalKey: undefined, modalVotes: undefined }
  }

  changeStatus(post, key) {
    if (!this.props.post.completed) {
      this.props.setCompleted(key);
    } else {
      this.props.setIncomplete(key);
    };
  }

  setDoneColor(post) {
    return this.props.post.completed ? 'btn btn-done' : 'btn btn-incomplete';
  }

  openModal(key, votes) {
    this.setState({ modalOpen: true, modalKey: key, modalVotes: votes })
  }

  closeModal() {
    this.setState({ modalOpen: false })
  }

  render() {
    return (
      <div className='card post post-item' key={ this.props.post.key }>
        <div className='card block'>
          <h3 className='card-title'>{ this.props.post.title }</h3>

          <h3>{ this.props.post.votes }</h3>

          <a className='card-text'>{ this.props.post.body }</a>

          <button className={this.setDoneColor(this.props.post)} onClick={() => {
            this.changeStatus(this.props.post, this.props.dupeKey);
          }}>
            Done
          </button>

          <button className='btn btn-danger' onClick={() => {
            this.props.deletePost(this.props.dupeKey);
          }}>
            X
          </button>

          <button className='btn btn-upvote' onClick={() => {
            this.openModal(this.props.dupeKey, this.props.post.votes);
          }}>
            ^
          </button>

        </div>

        <Modal
        isOpen={ this.state.modalOpen }
        style={ modalStyle }
        className="animation-target">
          <h5>Upvote?</h5>
          <button className='btn btn-upvote' onClick={() => {
            this.closeModal();
          }}>
            Close
          </button>

         <button className='btn btn-upvote' onClick={() => {
           this.props.upvote( this.state.modalKey, this.state.modalVotes );
           this.closeModal();
          }}>
           Confirm
         </button>
        </Modal>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setCompleted, setIncomplete, deletePost, upvote }, dispatch);
}

export default connect(null, mapDispatchToProps)(Card);
