import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { addTrailerToState } from '../../actions/movieActions';

export class Modal extends Component {
  componentDidUpdate() {
    this.modalTarget = document.createElement('div');
    this.modalTarget.className = 'modal';
    document.body.appendChild(this.modalTarget);
    this._render();
  }

  handleClick = () => {
    ReactDOM.unmountComponentAtNode(this.modalTarget);
    document.body.removeChild(this.modalTarget);
  };

  _render() {
    if (this.props.trailer) {
      ReactDOM.render(
        <div>
          <iframe
            className="modal-trailer"
            title="modal-trailer"
            src={this.props.trailer}
            width="800"
            height="500"
          />
          <button className="remove-modal" onClick={this.handleClick}>
            X
          </button>
        </div>,
        this.modalTarget
      );
    }
  }

  render() {
    return <noscript />;
  }
}

const mapStateToProps = state => ({
  trailer: state.movies.trailer
});

const mapDispatchToProps = dispatch => ({
  addTrailerToState: trailer => dispatch(addTrailerToState(trailer))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Modal);
