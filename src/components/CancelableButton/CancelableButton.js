import React, { Component } from 'react';
import DelayedAction from '../../utils/DelayedAction.js';
import Button from '../Button/Button.js';
import PropTypes from 'prop-types';
import ProgressionCircle from './ProgressionCircle.js';

class CancelableButton extends Component {
  constructor(props) {
    super(props);
    this.click = this.click.bind(this);
    this.state = {
      isExecuting: false,
      countdown: 0,
      didCancel: false
    };
  }

  componentWillUnmount() {
    if(this.state.isExecuting) {
      this.delayedAction.cancel({broadcast: false});
      return;
    }
  }

  click() {
    if(this.state.isExecuting) {
      this.delayedAction.cancel();
      return;
    }

    this.delayedAction = new DelayedAction({
      delay: 500,
      step: 3,
      cleanupOnAction: this.props.shouldCleanup,
      onAction: () => {
        this.props.trigger();
      },
      onTick: step => {
        this.setState(state => ({
          isExecuting: true,
          countdown: step
        }), () => this.props.onStatus(this.state));
      },
      onCancel: () => {
        this.setState(state => ({
          didCancel: true
        }), () => this.props.onStatus(this.state));
      },
      onCleanup: () => {
        this.setState(state => ({
          isExecuting: false,
          didCancel: false
        }), () => this.props.onStatus(this.state));
      }
    });
  }

  render() {
    return (
      <Button theme='primary' onClick={this.click} disabled={this.state.didCancel}>
        {!this.state.isExecuting && this.props.children}
        {this.state.isExecuting && !this.state.didCancel ? <ProgressionCircle strokeColor="#B534E2" duration={2000} /> : ''}
        {this.state.isExecuting && this.state.didCancel && this.props.children}
      </Button>
    );
  }
}

CancelableButton.defaultProps = {
  shouldCleanup: true
}

CancelableButton.propTypes = {
  shouldCleanup: PropTypes.bool,
  onStatus: PropTypes.func,
  trigger: PropTypes.func
}

export default CancelableButton;