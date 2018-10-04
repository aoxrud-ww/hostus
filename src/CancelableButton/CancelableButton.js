import React, { Component } from 'react';
import styles from './CancelableButton.module.scss';
import DelayedAction from '../utils/DelayedAction.js';

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
    const countdown = (this.props.template || '').replace('{countdown}', this.state.countdown);

    return (
      <button onClick={this.click} disabled={this.state.didCancel} className={styles.button}>
        {!this.state.isExecuting && this.props.children}
        {this.state.isExecuting && !this.state.didCancel ? countdown : ''}
        {this.state.isExecuting && this.state.didCancel && "Canceled"}
      </button>
    );
  }
}

export default CancelableButton;
